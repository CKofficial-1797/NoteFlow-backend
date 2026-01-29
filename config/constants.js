/**
 * Application constants and configurations
 */

const CONSTANTS = {
    // File upload constraints
    MAX_FILE_SIZE: 40 * 1024 * 1024, // 40MB
    ALLOWED_FILE_TYPES: ['pdf', 'jpg', 'jpeg', 'png'],
    
    // JWT Configuration
    JWT_EXPIRY: '7d',
    COOKIE_MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    
    // Request limits
    JSON_LIMIT: '50mb',
    URL_ENCODED_LIMIT: '50mb',
    
    // HTTP Status Codes (for reference)
    STATUS_CODES: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
        INTERNAL_SERVER_ERROR: 500,
    },
    
    // Error Messages
    ERRORS: {
        INVALID_EMAIL: 'Please enter a valid email',
        INVALID_FILE_TYPE: 'file must be .pdf, .jpg, .jpeg, or .png',
        FILE_SIZE_EXCEEDED: 'File size exceeds 40MB limit',
        MISSING_FIELDS: 'All required fields must be provided',
        UNAUTHORIZED: 'Unauthorized: No token provided',
        TOKEN_EXPIRED: 'Token has expired',
        INVALID_TOKEN: 'Invalid token',
        USER_NOT_FOUND: 'User not found',
        ROUTE_NOT_FOUND: 'Route not found',
        SERVER_ERROR: 'Internal server error',
    }
};

module.exports = CONSTANTS;
