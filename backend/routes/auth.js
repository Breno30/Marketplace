const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
router.use(express.json());

mongoose.connect('mongodb://127.0.0.1/marketplace');

router.post('/auth', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    //comparing password from request and database
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    //Login is validated 
    res.send(true);
});

module.exports = router;