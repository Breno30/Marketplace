const jwt = require('jsonwebtoken');

function auth(req, res, next) {


    const token = req.cookies.token;

    if (!token) return res.status(401).send('No token provided!');

    try {
        const decodedPayload = jwt.verify(token, process.env.Marketplace_jwtPrivateKey);
        req.user = decodedPayload;
        next();
    } catch (error) {
        res.status(400).send('Invalid token!');
    }
}

module.exports = auth;