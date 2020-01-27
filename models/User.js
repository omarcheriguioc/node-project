const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    first_name: mongoose.Schema.Types.String,
    last_name: mongoose.Schema.Types.String
});

module.exports = mongoose.model("User", UserSchema);