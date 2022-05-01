const config = require('config');

const posts = require('./routes/posts')
const users = require('./routes/users')
const auth = require('./routes/auth')

const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('API on');
});

app.use(posts);
app.use(users);
app.use(auth);

const port = config.get('PORT');

app.listen(port, () => console.log(`Listening on port ${port}...`));