const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API on');
});


app.listen(3000, () => console.log('Listening on port 3000...'));