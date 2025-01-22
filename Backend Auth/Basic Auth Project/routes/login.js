const router = require('express').Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    });
    return schema.validate(data);
};

router.post('/', async (req, res) => {
    try {
        // Validate input
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            });
        }

        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({
                message: "Invalid email or password"
            });
        }

        // Verify password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({
                message: "Invalid email or password"
            });
        }

        // Generate token
        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send success response
        res.status(200).send({
            message: "Logged in successfully",
            token: token,
            user: {
                email: user.email,
                fullName: user.fullName
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

module.exports = router;