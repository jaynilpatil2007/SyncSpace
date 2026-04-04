import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from '../models/proj.model.js';

export const createProject = asyncHandler(async (req, res) => {
    const { projName, projPassword } = req.body;
    if (!projPassword) throw new ApiError(400, "Fill all credentials");

    const project = await Project.create({
        projName,
        projPassword,
        owner: req.user._id,
        members: [req.user._id]
    })

    if (!project) throw new ApiError(500, "Something went wrong while creating project in DB");

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Project created successfully")
        )
});

export const joinByPasswordProject = asyncHandler(async (req, res) => {
    const { projName, projPassword } = req.body;
    if (!projName || !projPassword) throw new ApiError(400, "Fill all credentials");

    const project = await Project.findOne({ projPassword });
    if (!project) throw new ApiError(500, "Project not found");

    if (!project.members.includes(req.user._id)) {
        project.members.push(req.user._id);
        await Project.save();
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, "user join project succesfully")
        )
});

export const getProject = asyncHandler(async (req, res) => {
    const { projId } = req.params;

    const project = await Project.findById(projId).populate("owner", "fullname email").populate("members", "fullname email");
    if (!project) throw new ApiError(400, "project not found");

    return res
        .status(200)
        .json(
            new ApiResponse(200, "get project details")
        )
})