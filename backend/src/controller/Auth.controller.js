require('dotenv').config();
const validator     = require('validator');
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const modelUser     = require('../model/User.model');
const httpResponses = require('../utils/responses');

const JWT_SECRET = process.env.JWT_SECRET_BACKEND;

exports.register = async (req, res) => {
    const { email, fullname, password } = req.body;

    if (!validator.isEmail(email)) {
        return httpResponses.sendError(res, 400, 'Invalid email address');
    }

    try {
        const foundUser = await modelUser.getUserByEmail(email);
        if (foundUser) {
            return httpResponses.sendError(res, 403, 'User is created!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await modelUser.createUser(email, fullname, hashedPassword);;
        
        const token = jwt.sign(
            { user_id: newUser.lastID },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        await modelUser.updateAccessTokenById(newUser.lastID, token);

        return httpResponses.sendSuccess(res, { 
            message: 'Register successfully', 
            accesToken: {
                token, 
                expiresIn: 3600 
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
        return httpResponses.sendError(res, 401, 'Invalid email address');
    }

    try {
        const foundUser = await modelUser.getUserByEmail(email);
        if (!foundUser) {
            return httpResponses.sendError(res, 401, 'Invalid email or password');
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            const token = jwt.sign(
                { user_id: foundUser.id },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            await modelUser.updateAccessTokenById(foundUser.id, token);

            return httpResponses.sendSuccess(res, { accesToken: { token, expiresIn: 3600 } });
        } else {
            return httpResponses.sendError(res, 401, 'Invalid email or password');
        }
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};

exports.logout = async (req, res) => {
    try {
        await modelUser.updateAccessTokenById(req.user.user_id, null);
        return httpResponses.sendSuccess(res, { message: 'OK' });
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }

};
