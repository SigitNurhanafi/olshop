const modelUser     = require('../model/User.model');
const httpResponses = require('../utils/responses');

exports.getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const foundUser = await modelUser.getUserById(userId);
        if (!foundUser) {
            return httpResponses.sendError(res, 404, 'User not found');
        }

        return httpResponses.sendSuccess(res, foundUser);
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};