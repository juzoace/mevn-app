const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true},
    email: { type: String, required: true },
    hash: String,
    salt: String
});

// UserSchema.plugin(uniqueValidator);
mongoose.model('User', UserSchema);