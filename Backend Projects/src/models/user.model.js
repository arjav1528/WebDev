import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            required: true
        },
        coverImage: {
            type: String
        },
        watchHistory: [{
            type: Schema.Types.ObjectId,
            ref: "Video"
        }],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
);
// Middleware (pre-hook) that runs before saving the user
userSchema.pre("save", async function(next){
    // Debug: Log password before hashing
    // console.log("Pre-save password:", this.password);
    
    // Skip hashing for testing
    if(!this.isModified("password")){
        return next();
    }
    
    // Store plain text for testing
    // WARNING: Remove in production!
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    // Direct comparison for testing
    // WARNING: Remove in production!
    return this.password === password;
};

userSchema.methods.generateAccesToken = function(){
    // Generate a JWT access token for the user
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        fullName : this.fullName,
    

    },
    process.env.JWT_SECRET,
    {
        expiresIn : process.env.JWT_EXPIRY
    }
    );
};

userSchema.methods.generateRefreshToken = function(){
    // Generate a JWT refresh token for the user
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName,
        },
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_REFRESH_EXPIRY
        }
    );
}

const User = mongoose.model("User", userSchema);
export default User;