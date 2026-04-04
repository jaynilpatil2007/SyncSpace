import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
        ref: "User"
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true });

projSchema.pre("save", async function () {
    if (!this.isModified("projPassword")) return;

    this.projPassword = await bcrypt.hash(this.projPassword, 10)
});

projSchema.methods.isPasswordCheck = async function (projPassword) {
    return await bcrypt.compare(projPassword, this.projPassword);
}

export const Project = mongoose.model("Project", projSchema);