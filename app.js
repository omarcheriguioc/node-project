const express = require('express')
const app = express()
const connectDb = require('./utils/connectDb')
const user = require("./models/User")
const routerArticles = require("./routes/Articles")
const routerLogin = require("./routes/Login")
const routerImage = require("./routes/Image")
const bodyParser = require('body-parser')
const cors = require('cors')

const db = connectDb();

app.use(cors());
app.use(express.json());

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
app.use("/",routerLogin)
app.use("/image",routerImage)

app.listen(process.env.PORT, ()=>{
    console.log("Server listening on port 8080...")
})