import mongoose from "mongoose";
import dotenv from 'dotenv';
import { DB_NAME } from "../constants.js"

// Configure dotenv with path
dotenv.config({ path: '/home/ven0m0p/WebDev/Backend Projects/src/.env'});

// Debug: Log environment variables


const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected ✅ DB Host: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.error("MONGODB connection failed:");
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;