const mongoose = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema({
    thumbnail: String,
    title: String,
    description: String,
    price: Number,
    location: String,
    date: Date,
    isPublic: Boolean,
    authorId: String
}));

module.exports = Post;