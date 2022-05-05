const config = require('config');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
router.use(express.json());

var User = require('../models/user');

mongoose.connect(config.get('db'));

router.get('/user/me', auth, async (req, res) => {
    //return current user
    const user = await User.findById(req.user._id).select('_id name email');
    res.send(user);
});

router.get('/user/:id', (req, res) => {
    const id = req.params.id.toString();

    User
        .findById(id)
        .select('_id name email')
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.post('/user', async (req, res) => {
    let user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const token = user.generateAuth();

    user
        .save()
        .then(r => {
            //return true if name is in the object
            res.header('x-auth-header', token).send(Boolean(r.name));
        })
        .catch(err => res.send(err.message));
});

module.exports = router;