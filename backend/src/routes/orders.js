const config = require('config');
const auth = require('../middleware/auth')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.use(express.json());
const Order = require('../models/order');

mongoose.connect(config.get('db'))

router.get('/orders', (req, res) => {
    const user = req.query.user
    const product = req.query.product

    const conditions = {}
    if(user) conditions.userId = user
    if(product) conditions.productId = product

    Order
        .find(conditions)
        .then(result => res.send(result))
});

router.post('/order', (req, res) => {
    const order = new Order({
        userId: req.body.user_id,
        productId: req.body.product_id,
        paymentId: req.body.payment_id,
        deliveryId: req.body.delivery_id
    });

    order.save()
        .then(res.send('Order successfully created!'))
        .catch(err => res.send(err.message));
});

module.exports = router;