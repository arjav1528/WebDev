require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());

const connection = require('./DB/db');


connection();


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});