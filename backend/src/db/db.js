import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.BASE_URL}/${DB_NAME}`);
        console.log("MongoDb connected successfuly");
    } catch (error) {
        console.log("MongoDB connection failed: ", error);
    }
}