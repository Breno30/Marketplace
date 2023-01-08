const mongoose = require('mongoose');

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    type: String,
    payment_date: Date,
    status: String
}));

module.exports = Transaction;