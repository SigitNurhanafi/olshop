const UserModel = require('../model/User.model');

exports.getUserById = async (req, res) => {
    const {userId} = req.params;

    try {
        const foundUser = await UserModel.getUserById(userId);
        if (!foundUser) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json(foundUser);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

