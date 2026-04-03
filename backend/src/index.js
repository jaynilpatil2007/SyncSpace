import app from './app.js';
import { connectDB } from './db/db.js';
import dotenv from "dotenv";
import path from "path";
import express from "express";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
})

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`The server is live on port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("Error: ", err);
    })
