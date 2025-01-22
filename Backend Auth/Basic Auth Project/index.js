require('dotenv').config();

const express = require('express');
const cors = require('cors');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const connection = require('./DB/db');

const app = express();

// Database connection
connection();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;