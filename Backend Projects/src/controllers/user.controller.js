import asyncHandler from '../utils/asyncHandler.js';
// ...existing code...
import { APIError } from '../utils/APIErrorHandler.js';
import APIResponse from '../utils/APIResponses.js';
import User from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// ...existing code...

// ...existing code...

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const existedUser = await User.findOne({
            $or: [{email}, {username}]
        })
        if(!existedUser){
            throw new APIError("User Not Found", 404);
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        return {accessToken, refreshToken};
    
        user.refreshToken = refreshToken;
        await user.save({validatebeforeSave : false});
        return {accessToken, refreshToken};
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
    else if(!await existedUser.isPasswordCorrect(password)){
        throw new APIError("Invalid credentials", 401);
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(existedUser._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    if(!loggedInUser){
        throw new APIError("User login failed", 500);
    }
    const options = {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new APIResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );

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

export {
    loginUser,
    registerUser
};