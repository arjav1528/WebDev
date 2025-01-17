import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '/home/ven0m0p/WebDev/Backend Projects/src/.env'});

// Configure cloudinary
cloudinary.config({
    cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME),
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: String(process.env.CLOUDINARY_API_SECRET)
});

// console.log(String(process.env.CLOUDINARY_CLOUD_NAME));
// console.log(process.env.CLOUDINARY_API_KEY);
// console.log(String(process.env.CLOUDINARY_API_SECRET));

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // Upload the file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        
        // File has been uploaded successfully
        console.log("File uploaded successfully", response.url);
        fs.unlinkSync(localFilePath); // remove the locally saved temp file
        return response;

    } catch (error) {
        console.error("File upload failed :", error.message);
        fs.unlinkSync(localFilePath); // remove the locally saved temp file
        return null;
    }
}

export {uploadOnCloudinary};