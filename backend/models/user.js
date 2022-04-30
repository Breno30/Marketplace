const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024
    }

}));

module.exports = User;