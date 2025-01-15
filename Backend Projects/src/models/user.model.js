/*
id
username
email
fullName
avatar
coverImage
watchHistory ObjectId[]
password
refreshToken
createdAt
updatedAt
*/

import mongoose,{Schema} from "mongoose";

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true

        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        fullName : {
            type : String,
            required : true
        },
        avatar : {
            type : String
        },
        coverImage : {
            type : String
        },
        watchHistory : [
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        password : {
            type : String,
            required : [true,"Password is required"]
        },
        refreshToken : {
            type : String
        },
        createdAt : {
            type : Date,
            default : Date.now
        },
        updatedAt : {
            type : Date,
            default : Date.now

    }
)

export default mongoose.model("User",userSchema);
