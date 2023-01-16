const auth = require('../middleware/auth')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const Product = require('../models/product');

mongoose.connect(process.env.Marketplace_db);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Images/'));
    },
    filename: (req, file, cb) => {
        // const fileName = req.body.title.replace(/[\u0300-\u036f]/g, "").replace(' ', '_');
        // const fileExtension = path.extname(file.originalname);
        // const currentTime = new Date().toISOString();
        // cb(null, `${fileName}_${currentTime}${fileExtension}`)
        
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });

router.get('/products',(req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const searched = req.query.searched;

    const conditions = {}
    if (searched) conditions.title = { $regex: searched, $options: 'i' };

    Product
        .find(conditions)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.get('/products/count', (req, res) => {
    const searched = req.query.searched;

    const conditions = {};
    if (searched) conditions.title = { $regex: searched, $options: 'i' }

    Product
        .find(conditions)
        .countDocuments()
        .then(result => res.send(result.toString()));
});

router.get('/product/:id', (req, res) => {
    const id = req.params.id.toString();

    Product
        .findById(id)
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

router.put('/product/:id', async (req, res) => {
    const id = req.params.id;
    const update = (({ title, description, price }) => ({ title, description, price })) (req.body);
    const product = await Product.findOneAndUpdate({id}, update);
    product.save();

    res.send(product);
});

router.post("/product", upload.single('image'), (req, res) => {

    const { title, description, price, longitude, latitude } = req.body;

    const product = new Product({
        title,
        description,
        price,
        thumbnail: req.file.filename,
        location: { 
            "type": "Point",
            "coordinates": [longitude, latitude]
        }
    });

   product.save()
        .then(res.send('Product successfully created!'))
        .catch(err => res.send(err.message));
});

module.exports = router;