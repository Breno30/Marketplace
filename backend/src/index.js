if (!process.env.Marketplace_jwtPrivateKey ||
    !process.env.Marketplace_db ||
    !process.env.Marketplace_MP_AUTH ){
    console.error('FATAL ERROR: Environment variables are not defined.');
    process.exit(1);
}

const products = require('./routes/products')
const users = require('./routes/users')
const orders = require('./routes/orders')
const auth = require('./routes/auth')

const express = require('express');
const cors = require('cors');
const cp = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: true,
}));

app.use(cp());

app.get('/', (req, res) => {
    res.send('API on');
});

app.use(products);
app.use(users);
app.use(orders);
app.use(auth);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));