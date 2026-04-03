import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";

export const generateAccessRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new ApiError(401, "User not found");

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
    }

    return { accessToken, refreshToken };
}

export const signup = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        throw new ApiError(401, "fill all credentials");
    }

    if (password.length < 6) throw new ApiError(400, "Password contains 6 characters");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new ApiError(400, "Invalid email");

    const existedUser = await User.findOne({ email });
    if (!existedUser) throw new ApiError(400, "User is already existed");

    const user = User.create({
        fullname,
        email,
        password
    })

    const { accessToken, refreshToken } = generateAccessRefreshToken(user._id);

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) throw new ApiError(500, "Something went wrong while registering the user");

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(201, createdUser, "Signup Successfull")
        );
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) throw new ApiError(400, "Email not found");

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(400, "User not found");

    const isPasswordValid = await user.isPasswordCorrect();
    if (!isPasswordValid) throw new ApiError(400, "Incorrect Password");

    const { accessToken, refreshToken } = generateAccessRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, loggedInUser, "Logged In successfully")
        )

})

export const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "Logged out successfully")
        )
})