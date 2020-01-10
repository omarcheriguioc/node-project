const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    firstName: mongoose.Schema.Types.String,
    lastName: mongoose.Schema.Types.String
});

module.exports = mongoose.model("User", UserSchema);