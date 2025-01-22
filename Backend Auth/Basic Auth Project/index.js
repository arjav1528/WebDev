require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const loginRoute = require('./routes/login');
const resgisterRoute = require('./routes/register');
const connection = require('./DB/db');




// Database connection
connection();


//Middlewares
app.use(express.json());
app.use(cors());


//Routes
app.use('/api',loginRoute);
app.use('/api',resgisterRoute);

app.use("/", (req,res) => {
    res.status(200).send({
        message : "Welcome to the API"
    })  
})







//Server
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});