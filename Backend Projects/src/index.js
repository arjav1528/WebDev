import {app} from './app.js';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/index.js';

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        // console.log(`Mongo DB Connected`);
        console.log(`Server running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
        app.listen(PORT);
        })
    .catch((e) => {
        console.log(`Mongo DB Connection error : ${e}`);
    });