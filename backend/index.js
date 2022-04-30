require('./models/user');
require('./models/post');

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

app.listen(3000, () => console.log('Listening on port 3000...'));