const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    label: String,
    cep: String,
    country:String,
    state: String,
    city: String,
    neighbourhood: String,
    street: String,
    number: String,
    commentary: String,
    location: {
        type: { type: String },
        coordinates: [Number],
    }
});

module.exports = addressSchema;