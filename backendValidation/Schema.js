const { z } = require('zod');
const { SubjectsEnum } = require('./subjectEnum');
const { BranchEnum } = require('./branchEnum');


class FileHandleError extends Error {
    constructor(message, statusCode , type) {
      super(message);
      this.statusCode = statusCode;
      this.type = type
    }
  }
  

 const fileUplodeSchema = z.object({
    postedBy: z.string().email({
        message : "Please enter a valid email",
    }),
    branch : BranchEnum,
    subject : SubjectsEnum,
    semester : z.string().min(1 , {
        message : "Please Enter Semister"
    })



})

const fileUplodeSchemaFunction = (body)=>{
    try {

        fileUplodeSchema.parse(body)
        return
        
    } catch (error) {

        console.log("ZOD ERROR" , error.issues[0].message)

        throw new FileHandleError(error.issues[0].message , 400 , "zodError")
        
    }

}


module.exports = {fileUplodeSchema , fileUplodeSchemaFunction}


