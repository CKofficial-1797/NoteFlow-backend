const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const ProtectUser = async (req,res,next) => {
    try {
         const token = req.cookies.jwt;
         
         if(!token) {
            return res.status(401).json({message: 'Unauthorized: No token provided', code: 'NO_TOKEN'})
         }

         const decoded = jwt.verify(token,process.env.JWT_SECRET);

         const user = await User.findById(decoded.userId).select('-password')
         
         if (!user) {
            return res.status(404).json({message: 'User not found', code: 'USER_NOT_FOUND'})
         }

         req.user = user;
         next();
    } 
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({message: 'Token expired', code: 'TOKEN_EXPIRED'});
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({message: 'Invalid token', code: 'INVALID_TOKEN'});
        }
        res.status(500).json({message: error.message || 'Server error'})
        console.log('Error in protectUser', error.message)
    }
}

module.exports = ProtectUser;