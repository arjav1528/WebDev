import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath){
            throw new Error('Local file path is required');
        }
        cloudinary.uploader.upload(
            localFilePath, {
                resource_type: 'auto',
            }
        )
        console.log('File uploaded successfully');
        console.log(`File url: ${result.secure_url}`);
        fs.unlinkSync(localFilePath);
        return response;
        


    }catch(error){
        fs.unlinkSync(localFilePath);
        console.error(`Error uploading file to cloudinary: ${error.message}`);
        return null;
    }
}

export {uploadOnCloudinary};