const express = require('express')
const app = express()
const connectDb = require('./utils/connectDb')
const user = require("./models/User")
const routerArticles = require("./routes/Articles")
const bodyParser = require('body-parser')


const db = connectDb();

app.get("/",(req,res)=>{
    if(!db){
        return res.send({message : "impossible de se connecter à la base de données"})
    }else{
        console.log("connecté")
        res.send({message:"connecté à la base de données"})
    }
})

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  
app.use(bodyParser.json())

app.use("/",routerArticles)

app.listen(8080, ()=>{
    console.log("Server listening on port 8080...")
})