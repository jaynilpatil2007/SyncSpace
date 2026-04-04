import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { openDB } from "idb";
import { userStore } from "./userStore.js";

const initDB = async () => {
    return openDB("collab-db", 1, {
        upgrade(db) {
            db.createObjectStore("documents");
        },
    });
};

// Helper: always get the live socket from userStore (never captured at module load)
const getSocket = () => userStore.getState().socket;

export const useDocStore = create((set, get) => ({
    // 🧠 STATE
    docId: null,
    quill: null,
    isOnline: navigator.onLine,
    isSaving: false,
    _networkListenersAttached: false,
    _cleanupNetwork: null,

    // ⚙️ INIT EDITOR
    initEditor: async (quillInstance, docId) => {
        if (!quillInstance || !docId) {
            console.warn("initEditor called without quillInstance or docId");
            return;
        }

        // Guard: reject invalid docIds (e.g. the string "undefined")
        if (typeof docId !== "string" || !/^[a-fA-F0-9]{24}$/.test(docId)) {
            console.warn("initEditor: invalid docId, skipping init:", docId);
            return;
        }

        set({ quill: quillInstance, docId });

        // 📥 Offline-first: load from IDB cache first (instant), then sync from server
        try {
            const db = await initDB();
            const offlineDoc = await db.get("documents", docId);

            if (offlineDoc) {
                // Show cached content immediately
                quillInstance.setContents(offlineDoc);

                // Refresh from server in background when online
                if (navigator.onLine) {
                    try {
                        const res = await axiosInstance.get(`/document/${docId}`);
                        const serverContent = JSON.parse(res.data.data?.content || "null");
                        if (serverContent) {
                            quillInstance.setContents(serverContent);
                            await db.put("documents", serverContent, docId);
                        }
                    } catch (fetchErr) {
                        console.warn("Background server refresh failed, using cache:", fetchErr.message);
                    }
                }
            } else if (navigator.onLine) {
                // No cache — fetch from server
                try {
                    const res = await axiosInstance.get(`/document/${docId}`);
                    const serverContent = JSON.parse(res.data.data?.content || "null");
                    if (serverContent) {
                        quillInstance.setContents(serverContent);
                        await db.put("documents", serverContent, docId);
                    }
                } catch (fetchErr) {
                    console.error("Failed to load document from server:", fetchErr.message);
                }
            } else {
                console.warn("Offline and no local cache for doc:", docId);
            }
        } catch (dbErr) {
            console.error("IDB error during load:", dbErr);
        }

        // 📡 Join socket room — handle timing race: socket may not be .connected yet
        const socket = getSocket();

        const setupSocketRoom = (sock) => {
            sock.emit("join-doc", docId);
            // Remove stale listeners before attaching fresh ones
            sock.off("receive-changes");
            sock.on("receive-changes", (delta) => {
                quillInstance.updateContents(delta);
            });
        };

        if (socket?.connected) {
            // Already connected — join immediately
            setupSocketRoom(socket);
        } else if (socket) {
            // Socket exists but handshake not done yet — wait for it
            socket.once("connect", () => setupSocketRoom(socket));
            console.log("Socket not yet connected — will join room on connect");
        } else {
            console.warn("No socket available — real-time sync disabled");
        }

        // ✍️ User typing handler
        quillInstance.on("text-change", async (delta, _old, source) => {
            if (source !== "user") return;

            // 🔥 Always persist to IDB (works offline too)
            try {
                const content = quillInstance.getContents();
                const db = await initDB();
                await db.put("documents", content, docId);
            } catch (dbErr) {
                console.error("IDB write failed:", dbErr);
            }

            // 🔥 Broadcast realtime change when online
            if (navigator.onLine) {
                const liveSocket = getSocket();
                if (liveSocket?.connected) {
                    liveSocket.emit("send-changes", { docId, content: delta });
                }
            }

            // 🔥 Debounce server save
            get().debouncedSave();
        });
    },

    // 💾 SAVE TO BACKEND
    saveDocument: async () => {
        const { quill, docId } = get();
        if (!quill || !docId) return;
        if (!navigator.onLine) return; // Skip server save when offline

        try {
            set({ isSaving: true });

            const content = quill.getContents();

            await axiosInstance.put(`/document/${docId}`, {
                content: JSON.stringify(content),
            });

            set({ isSaving: false });
        } catch (err) {
            console.error("Save failed:", err);
            set({ isSaving: false });
        }
    },

    // ⏱️ DEBOUNCE SAVE
    debounceTimer: null,

    debouncedSave: () => {
        if (get().debounceTimer) clearTimeout(get().debounceTimer);

        const timer = setTimeout(() => {
            get().saveDocument();
        }, 2000);

        set({ debounceTimer: timer });
    },

    // 🌐 NETWORK LISTENER — idempotent (safe to call multiple times, won't stack)
    initNetwork: () => {
        // Prevent duplicate listeners
        if (get()._networkListenersAttached) return;
        set({ _networkListenersAttached: true });

        const handleOnline = () => {
            set({ isOnline: true });
            get().syncOfflineData();
        };

        const handleOffline = () => {
            set({ isOnline: false });
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Store cleanup fn so component can call it on unmount
        set({
            _cleanupNetwork: () => {
                window.removeEventListener("online", handleOnline);
                window.removeEventListener("offline", handleOffline);
                set({ _networkListenersAttached: false, _cleanupNetwork: null });
            },
        });
    },

    // Called on component unmount to clean up event listeners
    cleanupNetwork: () => {
        const cleanup = get()._cleanupNetwork;
        if (cleanup) cleanup();
    },

    // 🔄 SYNC OFFLINE DATA — pushes IDB cache to server when coming back online
    syncOfflineData: async () => {
        const { docId, quill } = get();
        if (!docId) return;

        try {
            const db = await initDB();
            const cachedContent = await db.get("documents", docId);

            if (!cachedContent) return;

            // Push the full cached document to server (single stringify, no double-encode)
            await axiosInstance.put(`/document/${docId}`, {
                content: JSON.stringify(cachedContent),
            });

            // Update Quill in case we want to confirm sync
            if (quill) {
                quill.setContents(cachedContent);
            }

            // Re-join the room and broadcast synced content to collaborators
            const liveSocket = getSocket();
            if (liveSocket?.connected) {
                liveSocket.emit("join-doc", docId);
                liveSocket.emit("send-changes", { docId, content: cachedContent });
            }

            console.log("Offline data synced to server successfully");
        } catch (err) {
            console.error("syncOfflineData failed:", err);
        }
    },
}));