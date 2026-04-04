import { Server } from "socket.io";
import http from "http";
import app from "../app.js"
import { socketAuthMiddleware } from "../middlewares/socket.middleware.js";
import { Document } from "../models/doc.model.js";

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
});

io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.user.fullname);

    socket.on("join-doc", async (docId) => {
        const doc = await Document.findById(docId);
        if (!doc) return;

        const isAllowed = doc.users.some((user) => user.toString() === socket.userId);
        if (!isAllowed) return;
        socket.join(docId);
    })

    socket.on("send-changes", ({ docId, content }) => {
        socket.to(docId).emit("receive-changes", content);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.user.fullname);
    })
})

export { io, server };
