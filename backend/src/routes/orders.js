const config = require('config');
const auth = require('../middleware/auth')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.use(express.json());
const Order = require('../models/order');

mongoose.connect(config.get('db'))

router.get('/orders', (req, res) => {
    const product = req.query.product

    const conditions = {}
    if(product) conditions.productId = product

    Order
        .find(conditions)
        .then(result => res.send(result))
});

router.post("/order", (req, res) => {
    const order = new Order({
        productId: 'String',
        paymentId: 'String',
        deliveryId: 'String'
    });

    order.save()
        .then(res.send('Order successfully created!'))
        .catch(err => res.send(err.message));
});

module.exports = router;