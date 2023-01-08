const config = require('config');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
router.use(express.json());

var User = require('../models/user');

mongoose.connect(process.env.Marketplace_db);

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

router.put('/user/:id', auth, async (req, res) => {
    const id = req.params.id;

    const update = (({name, email}) => ({name, email})) (req.body);
    const user = await User.findOneAndUpdate({_id: id}, update);
    if (!user) return res.send(false);

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
    }

    user.save();
    res.send(user);
});

router.post('/user', async (req, res) => {
    let user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const token = user.generateAuth();

    user
        .save()
        .then(result => {
            //return true if name is in the object
            if (result.name) {
                res.cookie("token", token, {
                    httpOnly: true
                });
                res.send(true);
            }
        })
        .catch(err => res.send(err.message));
});

module.exports = router;