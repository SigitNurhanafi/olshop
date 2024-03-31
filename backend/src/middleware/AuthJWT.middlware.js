const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_BACKEND;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'] ?? null;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({message: 'Unauthorized'}); // Unauthorized

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: 'Forbidden'}); // Forbidden
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
