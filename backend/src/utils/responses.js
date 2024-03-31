
exports.sendSuccess = (res, data, statusCode = 200) => {
    return res
        .status(statusCode)
        .json({
            status: true,
            ...data
        });
}

exports.sendError = (res, statusCode, message = 'Internal Server Error') => {
    return res
        .status(statusCode)
        .json({ 
            status: false, 
            error: message 
        });
}