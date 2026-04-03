import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRoute from "./routes/user.route.js";
app.use("/api/auth", authRoute);

export default app;