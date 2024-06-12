const { z } = require('zod');

 const BranchEnum = z.enum([
    "EE",   // Electrical Engineering
    "ECE",  // Electronics and Communication Engineering
    "CSE",  // Computer Science Engineering
    "ME",   // Mechanical Engineering
    "CE",   // Civil Engineering
    "MME",  // Metallurgical and Materials Engineering
    "ECM",  // Electronics and Computer Engineering
    "PIE"   // Production and Industrial Engineering
] , {
    message : "Enter a valid branch"
});

module.exports = {BranchEnum}