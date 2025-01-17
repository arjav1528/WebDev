import asyncHandler from '../utils/asyncHandler.js';
// ...existing code...
import { APIError } from '../utils/APIErrorHandler.js';
import APIResponse from '../utils/APIResponses.js';
import User from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';

// ...existing code...

// ...existing code...

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        
        if (!user) {
            throw new APIError("User not found", 404);
        }

        // Generate tokens
        const accessToken = user.generateAccesToken();
        const refreshToken = user.generateRefreshToken();

        // Save refresh token
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Token generation failed :", error.message);
        throw new APIError("Token generation failed", 500);
        
    }

}

const loginUser = asyncHandler(async (req, res) => {
    const {email,username,password} = req.body;
    if(!email && !username){
        throw new APIError("Email or username is required", 400);
    }
    if(!password){
        throw new APIError("Password is required", 400);
    }
    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    });

    if(!existedUser){

        throw new APIError("User Not Found", 404);
    }
    const isPasswordValid = await existedUser.isPasswordCorrect(password);


    if(!isPasswordValid){
        throw new APIError("Invalid credentials", 401);
    }
    // console.log(existedUser.email);

    try {
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(existedUser._id);
        // console.log('accessToken', accessToken);
    } catch (error) {
        throw new APIError("Token generation failed", 500);

        
    }

    try {
        const loggedInUser = await User.findById(existedUser._id);
        console.log(loggedInUser);
        if(!loggedInUser){
            console.log("User login failed Here");
            throw new APIError("Jai Hind Dsoto", 500);
        }
        const options = {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            
        }
    
        return res
        .status(200)
        .json(
            new APIResponse(200, {user : loggedInUser},"Health Check"),
            accessToken,
            );
    } catch (error) {
        console.log("User login failed");
        throw new APIError("User login failed", 500);
        
    }

    

});

const registerUser = asyncHandler(async (req, res) => {
    // Get user data from request
    const {fullName, email, username, password} = req.body;

    // Validation
    if ([fullName, email, username, password].some(field => field?.trim() === "")) {
        throw new APIError('All fields are required', 400);
    }

    // Check if user exists
    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })

    if (existedUser) {
        throw new APIError('User already exists', 409);
    }

    // Handle file uploads
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new APIError('Avatar is required', 400);
    }

    // Upload to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

    if (!avatar) {
        throw new APIError('Avatar upload failed', 400);
    }

    // Create user
    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    });

    // Remove password and refresh token from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");


    if (!createdUser) {
        throw new APIError('User registration failed', 500);
    }

    // Return success response
    return res.status(201).json(
        new APIResponse(201, createdUser, "User registered successfully")
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {

    const { refreshToken } = req.body;

    if (!refreshToken) {
        throw new APIError('Refresh token is required', 400);
    }

    const user = await User.findOne({
        refreshToken

    });

    if (!user) {
        throw new APIError('Invalid refresh token', 401);
    }

    const accessToken = user.generateAccesToken();

    return res.status(200).json(
        new APIResponse(200, { accessToken },
            'Access token refreshed successfully')
    );



});


const logoutUser = asyncHandler(async (req, res) => {

    const { refreshToken } = req.body;

    if (!refreshToken) {
        throw new APIError('Refresh token is required', 400);
    }

    const user = await User.findOne({
        refreshToken

    });

    if (!user) {
        throw new APIError('Invalid refresh token', 401);
    }

    user.refreshToken = null;

    await user.save({ validateBeforeSave: false });

});

export {
    loginUser,
    registerUser
};