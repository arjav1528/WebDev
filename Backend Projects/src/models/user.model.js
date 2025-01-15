// Define the user schema using Mongoose Schema
const userSchema = new Schema(
    {
        // Username field - must be unique
        username : {
            type : String,
            required : true,
            unique : true
        },
        
        // Email field - must be unique
        email : {
            type : String,
            required : true,
            unique : true
        },
        
        // User's full name
        fullName : {
            type : String,
            required : true
        },
        
        // URL to user's avatar/profile picture (optional)
        avatar : {
            type : String
        },
        
        // URL to user's cover image (optional)
        coverImage : {
            type : String
        },
        
        // Array of video IDs that user has watched
        // References the Video model using ObjectId
        watchHistory : [
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        
        // Hashed password field
        password : {
            type : String,
            required : [true,]
        },
        
        // JWT refresh token for auth
        refreshToken : {
            type : String
        },
        
        // Timestamps for document creation
        createdAt : {
            type : Date,
            default : Date.now
        },
        
        // Timestamps for document updates
        updatedAt : {
            type : Date,
            default : Date.now
        }
    }
)

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

// Export the model
export default mongoose.model("User",userSchema);