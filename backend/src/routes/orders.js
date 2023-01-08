const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.use(express.json());
const User = require('../models/user');
const Post = require('../models/post');
const Order = require('../models/order');
const Transaction = require('../models/transaction');

mongoose.connect(process.env.Marketplace_db);

router.get('/orders', (req, res) => {
  const user = req.query.user
  const product = req.query.product

  const conditions = {}
  if (user) conditions.userId = user
  if (product) conditions.productId = product

  Order
    .find(conditions)
    .then(result => res.send(result))
});

router.get('/order/:id', (req, res) => {
  const id = req.params.id.toString();

  Order
    .findById(id)
    .then(result => res.send(result))
    .catch(err => res.send(err.message));
})

router.post('/order', async (req, res) => {
  const userId = req.body.user_id;
  const productId = req.body.product_id;

  const user = await User.findById(userId);
  const { name, email } = user;
  
  const product = await Post.findById(productId);
  const { title, price } = product;

  // Transaction
  var data = JSON.stringify({
    "transaction_amount": price,
    "description": title,
    "payment_method_id": "pix",
    "payer": {
      "email": email,
      "first_name": name,
      "last_name": "User",
      "identification": {
        "type": "phone",
        "number": "551298940595"
      },
      "address": {
        "zip_code": "06233200",
        "street_name": "Av. das Nações Unidas",
        "street_number": "3003",
        "neighborhood": "Bonfim",
        "city": "Osasco",
        "federal_unit": "SP"
      }
    }
  });

  var config = {
    method: 'post',
    url: 'https://api.mercadopago.com/v1/payments',
    headers: {
      'Authorization': 'Bearer ' + process.env.Marketplace_MP_AUTH,
      'Content-Type': 'application/json'
    },
    data: data
  };

  let response = await axios(config);
  response = response.data;
  const paymentId = response['id'];

  let transaction = new Transaction({
    type: 'pix',
    status: 'pending'
  });

  transaction.save();

  const order = new Order({
    userId,
    productId,
    paymentId,
    deliveryId: 'placehbolder'
  });

  const responseOrder = await order.save();
  if (responseOrder) res.send(responseOrder['id']);

});

module.exports = router;