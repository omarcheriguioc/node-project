const express = require('express')
const router = express.Router()
const connectDb = require('../utils/connectDb')
//const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require('../models/User')

require("dotenv").config();

const db = connectDb()

router.post('/login',(req,res)=>{
    User.findOne({email: req.body.email,password: req.body.password},(err,user)=>{
        if(err) throw err;
        else {
            if(user){
                const token = jwt.sign({
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username
                },
                    process.env.JWT_SECRET
                );
                res.status(200).send({Auth: true, token: token})
            }
            else res.status(200).send({Auth: false,messageErr: "cannot find user"})
        }
    })
    
})

router.post('/register',(req,res)=>{
    if(db){
        let user = new User(req.body)
        console.log(req.body)
        user.save((err,user)=>{
            if(err) res.status(500).send({message: "can't register user"});
            else{
                res.status(200).send({data: user})
            }
        })
    }else{
        res.status(500).json({message: "database is not ready"})
    }
})

module.exports = router