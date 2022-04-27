const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.use(express.json());

mongoose.connect('mongodb://127.0.0.1/marketplace');

const postSchema = new mongoose.Schema({
    thumbnail:String,
    title: String,
    description: String,
    price: Number,
    location: String,
    date: Date,
    isPublic: Boolean,
    authorId: String
});

const Post = mongoose.model('Post', postSchema);

router.get('/posts', (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    Post
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.get('/posts/count', (req, res) => {
    Post
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