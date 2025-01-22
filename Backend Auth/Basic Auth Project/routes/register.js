const router = require('express').Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password'),
        fullName: Joi.string().required().label('Full Name')
    });
    return schema.validate(data);
};

router.post('/', async (req, res) => {
    try {
        // Validate request data
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send({
                message: "User with this email already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create and save new user
        const user = await new User({
            email: req.body.email,
            password: hashPassword,
            fullName: req.body.fullName
        }).save();

        const registeredUser = await User.findOne({ email: req.body.email });

        if(!registeredUser){
            return res.status(500).send({
                message: "Internal Server Error",
                error: error.message
            });
        }
        console.log(await bcrypt.compare(req.body.password, registeredUser.password));

        // Send success response
        res.status(201).send({
            message: "User registered successfully",
            user : registeredUser
        });

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

module.exports = router;