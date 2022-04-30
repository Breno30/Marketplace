const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.use(express.json());

const Post = require('../models/post');

mongoose.connect('mongodb://127.0.0.1/marketplace');

router.get('/posts', (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const searched = req.query.searched;

    const conditions = {}
    if (searched) conditions.title = { $regex: searched, $options: 'i' };

    Post
        .find(conditions)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.get('/posts/count', (req, res) => {
    const searched = req.query.searched;

    const conditions = {};
    if (searched) conditions.title = { $regex: searched, $options: 'i' }

    Post
        .find(conditions)
        .countDocuments()
        .then(result => res.send(result.toString()));
});

router.get('/post/:id', (req, res) => {
    const id = req.params.id.toString();

    Post
        .findById(id)
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});


router.post('/post', (req, res) => {
    const post = new Post(req.body);

    post.save()
        .then(res.send('Post successfully created!'))
        .catch(err => res.send(err.message));
});

module.exports = router;