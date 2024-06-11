const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const ProtectUser = async (req,res,next) => {
    try {
         const token = req.cookies.jwt;
         
         if(!token) {
            return res.status(401).json({message: 'unauthorized'})
         }

         const decoded = jwt.verify(token,process.env.JWT_SECRET);

         const user = await User.findById(decoded.userId).select('-password')

         req.user = user;

         next();
    } 
    catch (error) {
        res.status(500).json({message: error.mesage})
        console.log('Error in protectUser', error.message)
    }
}

module.exports = ProtectUser;