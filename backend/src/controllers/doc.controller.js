import { Document } from "../models/doc.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createDocument = asyncHandler(async (req, res) => {
    const { title } = req.body;

    const newDoc = await Document.create({
        title: title || "Untitled Document",
        content: content || "",
        owner: req.user._id,
        users: [req.user._id]
    })

    if (!newDoc) throw new ApiError(500, "Something went wrong while creating new document");

    return res
        .status(200)
        .json(
            new ApiResponse(200, newDoc, "Document created successfully")
        )
})

export const deleteDocument = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const doc = await Document.findById(id);
    if (!doc) throw new ApiError(404, "Document not found");

    if (doc.owner.toString() !== req.user._id.toString()) throw new ApiError(403, "Only owner can delete the file");

    await doc.deleteOne();

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Document delete successfully")
        )
})

export const updateDocument = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const doc = await Document.findById(id);
    if (!doc) throw new ApiError(400, "Document not found");

    if (!doc.users.some(user => user.toString() === req.user._id.toString())) throw new ApiError(400, "Unauthorized request");

    if (content !== undefined) doc.content = content;
    if (title !== undefined) doc.title = title;

    await doc.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Document updated successfully")
        )
})

export const getUserDocument = asyncHandler(async (req, res) => {
    const docs = await Document.find({
        users: req.user._id
    }).sort({ updatedAt: -1 });

    return res
        .status(200)
        .json(
            new ApiResponse(200, docs)
        )
})

export const getSingleDocument = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const doc = await Document.findById(id);
    if (!doc) throw new ApiError(400, "Document not found");

    if (!doc.users.some(user => user.toString() === req.user._id.toString())) throw new ApiError(400, "Unauthorized requset");

    return res
        .status(200)
        .json(
            new ApiResponse(200, doc)
        )
})