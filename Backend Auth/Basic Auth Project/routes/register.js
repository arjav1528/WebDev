const { valid } = require('joi');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

// const router = require('express').Router();

// router.post("/register", async (req,res) => {
//     try {

//         const error = validate(req.body);
//         if(error){
//             return res.status(400).send({
//                 message : error.details[0].message
//             })
//         }

//         const user = await User.findOne({
//             email : req.body.email
//         })

//         if(user){
//             return res.status(409).send({
//                 message : "User already exists in the database"
//             })
//         }

//         const salt = await bcrypt.genSalt(Number(process.env.SALT));
//         const hashPassword = await bcrypt.hash(req.body.password, salt);
//         const registeredUser = await new User({
//             ...req.body,
//             password : hashPassword
//         }).save();

//         res.status(200).message({
//             message : "User registered successfully",
//             user : registeredUser
//         })

        
//     } catch (error) {
//         return res.status(500).send('Internal Server Error');
        
//     }
// })

const router = require('express').Router();

router.post('/register', async (req, res) => {
    try {
        const error = validate(req.body);
        if(error){
            return res.status(400).send({
                message : error.details[0].message
            })
        }

        const user = await User.findOne({
            email : req.body.email
        })

        if(user){
            return res.status(409).send({
                message : "User already exists in the database"
            })
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const registeredUser = await new User({
            ...req.body,
            password : hashPassword
        }).save();

        res.status(200).message({
            message : "User registered successfully",
            user : registeredUser
        })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;