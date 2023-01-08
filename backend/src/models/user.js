const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

});

userSchema.methods.generateAuth = function () {
    //get Private Key from Environment Variable
    const jwtPK =  process.env.Marketplace_jwtPrivateKey;
    //generate token
    const token = jwt.sign({ _id: this._id }, jwtPK);

    return token;
}

const User = mongoose.model('User', userSchema);



module.exports = User;