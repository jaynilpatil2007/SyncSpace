import { useState, useEffect, useRef, useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { useDocStore } from "../store/docStore";

export default function NotesEditor() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { id } = useParams();
  const { initEditor, initNetwork, cleanupNetwork } = useDocStore();

  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const isSavingRef = useRef(false);

  // Subscribe to isSaving from store for the indicator
  const storeSaving = useDocStore((s) => s.isSaving);
  const isOnline = useDocStore((s) => s.isOnline);

  // 🧠 Init Quill ONCE — no duplicate mounts
  useEffect(() => {
    // Guard against double-mount in React StrictMode
    if (quillRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: false,
      },
    });

    quillRef.current = quill;

    // Wire up store (loads doc from IDB/server + sets up socket listeners)
    initEditor(quill, id);

    // Start network listeners (idempotent — safe to call multiple times)
    initNetwork();

    // Word count tracking
    quill.on("text-change", () => {
      const text = quill.getText();
      const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
      setWordCount(words.length);
    });

    // Cleanup on unmount
    return () => {
      cleanupNetwork();
      // Quill doesn't have a destroy() method in v2 — just clear the ref
      quillRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Only re-init if the doc id changes

  // ⚙️ Toolbar actions
  const execCommand = (command) => {
    const quill = quillRef.current;
    if (!quill) return;

    switch (command) {
      case "bold":
        quill.format("bold", !quill.getFormat().bold);
        break;
      case "italic":
        quill.format("italic", !quill.getFormat().italic);
        break;
      case "underline":
        quill.format("underline", !quill.getFormat().underline);
        break;
      case "strikeThrough":
        quill.format("strike", !quill.getFormat().strike);
        break;
      case "insertUnorderedList":
        quill.format("list", "bullet");
        break;
      case "insertOrderedList":
        quill.format("list", "ordered");
        break;
      case "justifyLeft":
        quill.format("align", "");
        break;
      case "justifyCenter":
        quill.format("align", "center");
        break;
      case "indent":
        quill.format("indent", "+1");
        break;
      case "outdent":
        quill.format("indent", "-1");
        break;
      case "removeFormat":
        quill.removeFormat(
          quill.getSelection()?.index || 0,
          quill.getSelection()?.length || 0
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white/3 backdrop-blur-md rounded-3xl border border-white/6 shadow-2xl overflow-hidden flex flex-col h-full">

      {/* HEADER */}
      <div className="p-6 border-b border-white/4 flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold">Team Notes</h2>

        <div className="flex items-center gap-4">
          <span className="text-xs text-white/40">{wordCount} words</span>

          {/* Online / Offline indicator */}
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              isOnline
                ? "bg-green-500/20 text-green-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>

          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                storeSaving ? "bg-yellow-400 animate-pulse" : "bg-green-400"
              }`}
            />
            <span className="text-xs text-white/60">
              {storeSaving ? "Saving..." : "Saved"}
            </span>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="p-3 border-b border-white/4 flex gap-2 flex-wrap">
        {[
          { cmd: "bold", label: "B" },
          { cmd: "italic", label: "I" },
          { cmd: "underline", label: "U" },
          { cmd: "strikeThrough", label: "S" },
          { cmd: "insertUnorderedList", label: "• List" },
          { cmd: "insertOrderedList", label: "1. List" },
        ].map((btn) => (
          <button
            key={btn.cmd}
            onClick={() => execCommand(btn.cmd)}
            className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* EDITOR */}
      <div className="flex-1 p-6 overflow-y-auto text-white">
        <div ref={editorRef} />
      </div>
    </div>
  );
}