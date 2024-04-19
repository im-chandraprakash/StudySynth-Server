const Success = (statusCode, message, data) => {
    return {
        statusCode: statusCode,
        success: true,
        message: message,
        data: data,
    };
};

const Errors = (statusCode, message, data) => {
    return {
        statusCode,
        success: false,
        message: message,
        data: data,
    };
};

module.exports = { Success, Errors };
