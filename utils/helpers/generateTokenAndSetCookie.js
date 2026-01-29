const jwt = require('jsonwebtoken')

const generateTokenAndSetCookie = (userId, res) => {
    if (!userId) {
        throw new Error('userId is required to generate token');
    }
    
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict"
    });

    return token;
};

module.exports = generateTokenAndSetCookie;