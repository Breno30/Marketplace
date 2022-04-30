const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
router.use(express.json());

mongoose.connect('mongodb://127.0.0.1/marketplace');



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

router.get('/user/:id', (req, res) => {
    const id = req.params.id.toString();

    User
        .findById(id)
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.post('/user', (req, res) => {
    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user
        .save()
        .then(user => res.send(`${user.name} registered!`))
        .catch(err => res.send(err.message));
});

module.exports = router;