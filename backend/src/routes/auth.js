const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
router.use(express.json());

var User = require('../models/user');

mongoose.connect(config.get('db'));

router.post('/auth', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    //comparing password from request and database
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuth();
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    }).send(true);
});

module.exports = router;