/**
 * Environment configuration and validation
 */

const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'GOOGLE_DRIVE_PARENT',
    'PORT'
];

const validateEnvironment = () => {
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        console.error('❌ Missing required environment variables:', missingVars);
        process.exit(1);
    }
    
    console.log('✅ All required environment variables are configured');
};

const getConfig = () => ({
    mongodb: {
        uri: process.env.MONGODB_URI,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
    googleDrive: {
        parentFolder: process.env.GOOGLE_DRIVE_PARENT,
    },
    server: {
        port: process.env.PORT || 5000,
        nodeEnv: process.env.NODE_ENV || 'development',
    },
    app: {
        name: 'NoteFlow Backend',
        version: '1.0.0',
    }
});

module.exports = {
    validateEnvironment,
    getConfig
};
