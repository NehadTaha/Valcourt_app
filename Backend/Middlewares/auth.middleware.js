const jwt = require('jsonwebtoken');

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
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (err) {
        res.status(401);
        res.send({
            message: 'Unauthorized'
        });
    }
}

// Function to check if user is an admin. Used for routes accessible only to admins
async function adminAuth(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        res.status(401);
        res.send({
            message: 'Unauthorized'
        });

        return;
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET);
        if (payload.admin) {
            next();
        } else {
            res.status(401);
            res.send({
                message: "User is not an admin"
            })
            return;
        }
    } catch (err) {
        res.status(401);
        res.send({
            message: 'Unauthorized'
        });
    }
}

module.exports = {standardAuth, adminAuth}