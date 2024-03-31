const jwt = require('jsonwebtoken');
const httpResponses = require('../utils/responses');
const modelUser = require('../model/User.model');

const JWT_SECRET = process.env.JWT_SECRET_BACKEND;

async function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] ?? null;

    if (token == null) {
        return httpResponses.sendError(res, 401, 'Unauthorized'); // Unauthorized
    }

    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) {
            return httpResponses.sendError(res, 403, 'Forbidden'); // Forbidden
        }

        req.user = user;

        // Ambil ID pengguna dari token
        const userId = req.user.user_id;

        // Ambil access token dari pengguna yang sedang masuk
        try {
            const foundUser = await modelUser.getAccessTokenByUserId(userId);
            if (!foundUser) {
                return httpResponses.sendError(res, 401, 'Unauthorized'); // Unauthorized
            }

            if (foundUser.access_token !== token) {
                return httpResponses.sendError(res, 401, 'Unauthorized'); // Unauthorized
            }

            next();
        } catch (error) {
            console.error('Error:', error);
            return httpResponses.sendError(res, 500);
        }
    });
}

module.exports = { authenticateToken };
