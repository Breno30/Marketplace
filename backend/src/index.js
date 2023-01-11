if (!process.env.Marketplace_jwtPrivateKey){
    console.error('FATAL ERROR: Environment variable jwtPrivateKey is not defined.');
    process.exit(1);
}

if (!process.env.Marketplace_db){
    console.error('FATAL ERROR: Environment variable db is not defined.');
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