const express = require('express')
const app = express()
const connectDb = require('./utils/connectDb')
const user = require("./models/User")
require('dotenv').config()

const db = connectDb();

app.get("/",(req,res)=>{
    if(!db){
        return res.send({message : "impossible de se connecter à la base de données"})
    }else{
        res.send({message:"connecté à la base de données"})
    }
})

app.listen(8080, ()=>{
    console.log("Server listening on port 8080...")
})