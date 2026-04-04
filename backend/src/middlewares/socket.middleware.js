import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        //extract token from http-only cookies
        const cookie = socket.handshake.headers.cookie;

        if (!cookie) return next(new Error("No cookies found"));

        const token = cookie
            ?.split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];

        if (!token) throw new ApiError(401, "Unauthorized - No Token Provided");


        //verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) throw new ApiError(401, "Unauthorized - Invalid Token");

        // find the user from DB
        const user = await User.findById(decoded._id).select("-password -refreshToken");
        if (!user) throw new ApiError(400, "User not found");


        //attach user info to sockets: 
        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`Socket authentication for user: ${user.fullname} (${user._id})`);

        next();
    } catch (error) {
        next(new Error(error?.message || "Unauthorized"));
    }
}