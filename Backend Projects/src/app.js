import express from 'express';
import cors from 'cors'


const app = express();

//Common middleware

app.use(
    cors({
        origin : process.env.CORS_ORIGIN,
        credentials: true,
    })
)
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

export {app};



