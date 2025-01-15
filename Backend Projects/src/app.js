import express from 'express';
import cors from 'cors'
import healthCheck from './controllers/healthcheck.controllers.js';


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

//Routes
import healthCheckRouter from './routes/healthcheck.route.js';




//routes
app.use("/api/v1/healthcheck", healthCheckRouter)
export {app};



