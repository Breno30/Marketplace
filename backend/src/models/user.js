const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const addressSchema = require('../schemas/address')

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
    },
    orders: [{
        type: String,
        required: true
    }],
    addresses: [addressSchema]

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