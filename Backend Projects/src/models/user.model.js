import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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
    // Only hash the password if it has been modified
    if(!this.isModified("password")){
        return next();
    }
    
    // Hash password with bcrypt using 8 rounds of salt
    this.password = await bcrypt.hash(this.password, 8);
    next();
});


userSchema.methods.isPasswordCorrect = async function(password){
    // Compare the plain-text password with the hashed password
    return await bcrypt.compare(password, this.password);

};

userSchema.methods.generateAccesToken = function(){
    // Generate a JWT access token for the user
    JWT.sign({
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
    JWT.sign(
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