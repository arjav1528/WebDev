const router = require('express').Router();
const Joi = require('joi');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

router.post("/login", async (req,res) => {
    try {
        const error = validate(req.body);
        if(error){
            return res.status(400).send({
                message : error.details[0].message
            })
        }
        const user = await User.findOne({
            email : req.body.email,
            password : req.body.password
        });
        if(!user){
            return res.status(404).send({
                message : "User not found"
            })
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).send({
                message : "Invalid Password"
            })
        }
        const token = user.generateAuthToken();

        res.status(200).send({
            message : "User logged in successfully",
            user : user,
            token : token
        })

        
    } catch (error) {
        console.error("Internal Server Error");
        return res.status(500).send({
            message : "Internal Server Error",
            error : error
        });
        
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    })
    return schema.validate(data);
}

module.exports = router;