const express = require('express')
const router = express.Router()
const connectDb = require('../utils/connectDb')
const Article = require('../models/Article')

const db = connectDb()

router.get('/articles',(req,res)=>{
    if(db){
        Article.find((err, data) => {
            if (err) res.status(500).send({messageErr: "can't get articles"});
            else{
                res.status(200).send(data);
            }
        });
    }else{
        res.status(500).json({message: "database is not ready"})
    }
})

router.post('/articles',(req,res)=>{
    
    let article = new Article(req.body)

    article.save((err,article)=>{
        if(err){
            return res.status(500).send({message: "can't insert article"})
        }else{
            res.status(200).send({data: article})
        }
    })
})

//lister les articles d'un auteur
router.get('/articles/:Username',(req,res)=>{
    if(db){
        Article.find({username: req.params.Username},(err, data) => {
            if (err) res.status(500).send({messageErr: "can't get articles"});
            else{
                res.status(200).send(data);
            }
        });
    }else{
        res.status(500).json({message: "database is not ready"})
    }
})

router.get('/articles_by_topic/:topic',(req,res)=>{
    if(db){
        Article.find({'topics.topic_name':req.params.topic},(err,data)=>{
            if (err) res.status(500).send({messageErr: "can't find articles for topic:"+topic});
            else{
                res.status(200).send(data);
            }
        })
    }else{
        res.status(500).json({message: "database is not ready"})
    }
})

router.get('/articles_by_id/:id',(req,res)=>{
    if(db){
        Article.findById(req.params.id,(err,data)=>{
            if (err) res.status(500).send({messageErr: "can't find articles with id: "+req.params.id});
            else{
                res.status(200).send(data);
            }
        })
    }else{
        res.status(500).json({message: "database is not ready"})
    }
})

// router.post('/articles_by_topic',(req,res)=>{
//     if(db){
//         Article.find({topics:req.body},(err,data)=>{
//             if (err) res.status(500).send({messageErr: "can't find articles for topic:"+topic});
//             else{
//                 res.status(200).send(data);
//             }
//         })
//     }else{
//         res.status(500).json({message: "database is not ready"})
//     }
// })

router.delete('/articles/:id',(req,res)=>{
    if(db){
        Article.findOneAndDelete(req.params.id, (err,data)=>{
            if (err) res.status(500).send({messageErr: "can't delete article"});
            else{
                res.status(200).send(data);
            }
        })
    }else{
        res.status(500).json({message: "database is not ready"})
    }
})

router.put('/articles/:id',(req,res)=>{
    if(db){
        console.log(req.body)
        Article.findByIdAndUpdate(req.params.id,req.body, (err,data)=>{
            if (err) res.status(500).send({messageErr: "can't update article"});
            else{
                res.status(200).send(data);
            }
        })
    }else{
        res.status(500).json({message: "database is not ready"})
    }
})

module.exports = router