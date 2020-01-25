const mongoose = require('mongoose');
require('dotenv').config()

const connectDb = async () => {
    const db = await mongoose.connect(process.env.MONGO_SRV,{
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return db;
}

module.exports = connectDb;