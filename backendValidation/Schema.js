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
        message : "Please Enter Semester"
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


const fileTypeCheckingFunction = (file )=>{
    const fileName = file.originalname
    const fileExtension = fileName.split('.').pop().toLowerCase()
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
    if (!allowedExtensions.includes(fileExtension)) {
        throw new FileHandleError("file must be .pdf, .jpg, .jpeg, or .png" ,400 , "zodError" )
    
    }

    return
  
}


module.exports = {fileUplodeSchema , fileUplodeSchemaFunction , fileTypeCheckingFunction}


