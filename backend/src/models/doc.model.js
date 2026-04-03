import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "Untitle Document",
        trim: true
    },
    content: {
        type: String,
        default: ""
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true
        }
    ],
    isPublic: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const Document = mongoose.model("Document", documentSchema);