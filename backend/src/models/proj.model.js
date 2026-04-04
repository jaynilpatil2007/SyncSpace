import mongoose from "mongoose";

const projSchema = new mongoose.Schema({
    projName: {
        type: String,
        default: "Untitled Project"
    },
    projPassword: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
    }
}, { timestamps: true });

export const Project = mongoose.model("Project", projSchema);