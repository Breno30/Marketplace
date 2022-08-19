const config = require('config');
const auth = require('../middleware/auth')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const Post = require('../models/post');

mongoose.connect(config.get('db'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Images/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });

router.get('/posts', (req, res) => {
    const page = req.query.page ?? 1;
    const pageSize = req.query.pageSize ?? 8;
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

router.post("/post", upload.single('image'), auth, (req, res) => {
    var encode_img = null;
    if (req.file) encode_img = fs.readFileSync(req.file.path).toString('base64');

    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        thumbnail: encode_img
    });

    post.save()
        .then(res.send('Post successfully created!'))
        .catch(err => res.send(err.message));
});

module.exports = router;