const mongoose = require('mongoose')

const Order = mongoose.model('Order', new mongoose.Schema({
    userId: String,
    productId: String,
    paymentId: String,
    deliveryId: String
}));

module.exports = Order