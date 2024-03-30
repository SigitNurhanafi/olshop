require('dotenv').config();
const validator = require('validator');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const UserModel = require('../model/User.model');

const JWT_SECRET = process.env.JWT_SECRET_BACKEND;

exports.register = async (req, res) => {
    const {email, password} = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).send({message: 'Invalid email address'});
    }

    try {
        const foundUser   = await UserModel.getUserByEmail(email);
        if (foundUser) {;
            return res.status(403).json({message: 'User is created!'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        UserModel.createUser(email, hashedPassword, async (err) => {
            const newUser   = await UserModel.getUserByEmail(email);
            const token     = jwt.sign(
                { userId: newUser.id }, 
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            res.json({ token, expiresIn: 3600 });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;
    if (!validator.isEmail(email)) {
        return res.status(401).send({message: 'Invalid email address'});
    }
    
    const foundUser   = await UserModel.getUserByEmail(email);
    if (!foundUser) {;
        return res.status(401).json({message: 'Invalid email or password'});
    }
    
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const token = jwt.sign(
            { userId: foundUser.id }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ token, expiresIn: 3600 });
    } else {
        res.status(401).send('Invalid email or password');
    }
};
