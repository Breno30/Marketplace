const config = require('config');

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

const posts = require('./routes/posts')
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

app.use(posts);
app.use(users);
app.use(orders);
app.use(auth);

const port = process.env.PORT || config.get('PORT');

app.listen(port, () => console.log(`Listening on port ${port}...`));