/**
 * Middleware for request validation
 */

const CONSTANTS = require('../config/constants');

/**
 * Validate that required fields are present in request body
 * @param {Array} requiredFields - Array of field names that must be present
 */
const validateRequiredFields = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(CONSTANTS.STATUS_CODES.BAD_REQUEST).json({
                message: CONSTANTS.ERRORS.MISSING_FIELDS,
                code: 'MISSING_FIELDS',
                missingFields
            });
        }
        
        next();
    };
};

/**
 * Validate that file is present
 */
const validateFilePresence = (req, res, next) => {
    if (!req.file) {
        return res.status(CONSTANTS.STATUS_CODES.BAD_REQUEST).json({
            message: 'File is required',
            code: 'NO_FILE'
        });
    }
    next();
};

module.exports = {
    validateRequiredFields,
    validateFilePresence
};
