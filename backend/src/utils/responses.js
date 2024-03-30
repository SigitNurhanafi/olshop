
function sendSuccessResponse(res, data) {
    res.status(200).json(data);
}

function sendErrorResponse(res, statusCode, message) {
    res.status(statusCode).json({ error: message });
}

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
};