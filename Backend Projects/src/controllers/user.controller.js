/**
 * User Controller
 * Handles user authentication, registration, and profile management
 */

// Import required utilities and models
import asyncHandler from '../utils/asyncHandler.js';
import { APIError } from '../utils/APIErrorHandler.js';
import APIResponse from '../utils/APIResponses.js';
import User from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

/**
 * Generates access and refresh tokens for a user
 * @param {string} userId - MongoDB user ID
 * @returns {Object} Access and refresh tokens
 */
const generateAccessAndRefreshToken = async (userId) => {
    try {
        // Find user by ID
        const user = await User.findById(userId);
        if(!user) throw new APIError("User not found", 404);

        // Generate tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save refresh token to user document
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new APIError("Token generation failed", 500);
    }
}

/**
 * User registration controller
 * Handles new user signup with file uploads
 */
const registerUser = asyncHandler(async (req, res) => {
    // Extract user data from request
    const {fullName, email, username, password} = req.body;

    // Validate required fields
    if ([fullName, email, username, password].some(field => !field?.trim())) {
        throw new APIError("All fields are required", 400);
    }

    // Check for existing user
    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    });

    if (existedUser) {
        throw new APIError("Email or username already exists", 409);
    }

    // Handle file uploads
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    // Validate avatar
    if (!avatarLocalPath) {
        throw new APIError('Avatar is required', 400);
    }

    // Upload files to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath ? 
        await uploadOnCloudinary(coverImageLocalPath) : null;

    if (!avatar) {
        throw new APIError('Avatar upload failed', 400);
    }

    // Create new user in database
    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    });

    // Get user without sensitive data
    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");

    // Return success response
    return res.status(201).json(
        new APIResponse(201, createdUser, "User registered successfully")
    );
});

export {
    registerUser,
    generateAccessAndRefreshToken
};