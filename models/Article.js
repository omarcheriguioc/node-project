const mongoose = require('mongoose')

const ArticleSchema = mongoose.Schema({
    title: mongoose.Schema.Types.String,
    content: mongoose.Schema.Types.String,
    username: mongoose.Schema.Types.String,
    published_at: mongoose.Schema.Types.Date,
    image_path: mongoose.Schema.Types.String,
    topics: [{
        topic_name: mongoose.Schema.Types.String
    }],
    comments: [{
        pseudo_name: mongoose.Schema.Types.String,
        body: mongoose.Schema.Types.String,
        date: mongoose.Schema.Types.Date
    }]
});

module.exports = mongoose.model("Article", ArticleSchema);