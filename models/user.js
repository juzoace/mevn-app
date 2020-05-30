const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    hash: String,
    salt: String
});

mongoose.model('User', UserSchema);