/**
 * Standardized API Response formatter
 * Ensures consistent response structure across all endpoints
 */

class ApiResponse {
    constructor(statusCode, data = null, message = 'Success') {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.data = data;
        this.message = message;
        this.timestamp = new Date().toISOString();
    }
}

const sendSuccess = (res, statusCode = 200, data = null, message = 'Success') => {
    const response = new ApiResponse(statusCode, data, message);
    return res.status(statusCode).json(response);
};

const sendError = (res, statusCode = 500, message = 'Internal Server Error', code = null) => {
    const response = new ApiResponse(statusCode, null, message);
    if (code) {
        response.code = code;
    }
    return res.status(statusCode).json(response);
};

module.exports = {
    ApiResponse,
    sendSuccess,
    sendError
};
