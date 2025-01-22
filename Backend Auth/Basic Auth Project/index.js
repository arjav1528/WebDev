require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const loginRoute = require('./routes/login');
const resgisterRoute = require('./routes/register');


app.use(express.json());
app.use(cors());

const connection = require('./DB/db');


connection();

app.use('/api',loginRoute);
app.use('/api',resgisterRoute);








const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});