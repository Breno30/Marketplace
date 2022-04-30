const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
router.use(express.json());

mongoose.connect('mongodb://127.0.0.1/marketplace');

router.get('/user/:id', (req, res) => {
    const id = req.params.id.toString();

    User
        .findById(id)
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.post('/user', async (req, res) => {
    let user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user
        .save()
        .then(user => res.send(`${user.name} registered!`))
        .catch(err => res.send(err.message));
});

module.exports = router;