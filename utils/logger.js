/**
 * Simple logger utility for consistent logging across the application
 */

const LOG_LEVELS = {
    ERROR: 'ERROR',
    WARN: 'WARN',
    INFO: 'INFO',
    DEBUG: 'DEBUG'
};

const getTimestamp = () => new Date().toISOString();

const formatLog = (level, message, meta = null) => {
    const log = {
        timestamp: getTimestamp(),
        level,
        message,
        ...(meta && { meta })
    };
    return JSON.stringify(log);
};

const logger = {
    error: (message, meta) => {
        console.error(formatLog(LOG_LEVELS.ERROR, message, meta));
    },
    
    warn: (message, meta) => {
        console.warn(formatLog(LOG_LEVELS.WARN, message, meta));
    },
    
    info: (message, meta) => {
        console.log(formatLog(LOG_LEVELS.INFO, message, meta));
    },
    
    debug: (message, meta) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(formatLog(LOG_LEVELS.DEBUG, message, meta));
        }
    }
};

module.exports = logger;
