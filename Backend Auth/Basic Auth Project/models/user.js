const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true
    },
    
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
});


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY,{expiresIn: '7d'});
    return token;
}

const User = mongoose.model('user',userSchema);

const validate = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().required().label('Full Name'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password')
    })
    return schema.validate(data);
}

module.exports = {User,validate}