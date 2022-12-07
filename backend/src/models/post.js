const mongoose = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema({
    thumbnail: String,
    title: String,
    description: String,
    price: Number,
    location: {
        type: { type: String },
        coordinates: [Number],
    },
    date: Date,
    isPublic: Boolean,
    authorId: String
}));

module.exports = Post;