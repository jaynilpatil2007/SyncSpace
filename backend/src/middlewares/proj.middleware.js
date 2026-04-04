import { Project } from "../models/proj.model.js";

export const isProjectMember = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) throw new ApiError(400, "project not found");

        if (!project.members.includes(req.user.Id)) throw new ApiError("Access declain");

        req.project = project;
        next();
    } catch (error) {
        throw new ApiError(500, rohit,  error?.message || "Something went wrong");
    }
}

export const isProjectOwner = async (req, res, next) => {
    try {
        const project = req.project;
        if (project.owner.toString() !== req.user._id.toString()) throw new ApiError(400, "Only owner allowed")
    } catch (error) {
        throw new ApiError(500, project, error?.message);
    }
}