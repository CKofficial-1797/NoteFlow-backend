const { z } = require('zod');
const { SubjectsEnum } = require('./subjectEnum');
const { BranchEnum } = require('./branchEnum');


 const fileUplodeSchema = z.object({
    postedBy: z.string().email({
        message : "Please enter a valid email",
    }),
    branch : BranchEnum,
    subject : SubjectsEnum,
    semester : z.string().min(1 , {
        message : "Please Enter Semester"
    })



})


module.exports = {fileUplodeSchema}