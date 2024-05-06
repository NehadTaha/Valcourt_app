const jwt = require('jsonwebtoken');
const secret_key = require('../constants');

// Function to check if the headers of HTTP requests have valid authorization 
async function standardAuth(req, res, next) {

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        res.status(401);
        res.send({
            message: 'Unauthorized'
        });

        return;
    }

    try {
        jwt.verify(token, secret_key);
        next();
    } catch (err) {
        res.status(401);
        res.send({
            message: 'Unauthorized'
        });
    }
}

module.exports = {standardAuth}