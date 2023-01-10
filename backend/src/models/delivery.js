const mongoose = require('mongoose');

const Delivery = mongoose.model('Delivery', new mongoose.Schema({
    starting_location: {
        type: { type: String },
        coordinates: [Number]
    },
    final_location: {
        type: { type: String },
        coordinates: [Number]
    },
    status: String
}));

module.exports = Delivery;