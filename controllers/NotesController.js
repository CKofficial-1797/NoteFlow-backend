const Notes = require("../models/NotesModel");
const { google } = require('googleapis')
const path = require('path')
const stream = require('stream');
const { fileUplodeSchemaFunction, fileTypeCheckingFunction } = require("../backendValidation/Schema");
const logger = require("../utils/logger");
const CONSTANTS = require("../config/constants");

//create the post
const KEYFILEPATH = path.join(__dirname, "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const uploadNotes = async (req, res) => {
    try {
         //uplode body validation
         fileUplodeSchemaFunction(req.body)
       
        const { postedBy, branch, semester, subject } = req.body;
        const file = req.file;

        // Validate file exists
        if (!file) {
            return res.status(400).json({ 
                message: CONSTANTS.ERRORS.MISSING_FIELDS,
                code: 'NO_FILE'
            });
        }

        //checks for uplode file type
        fileTypeCheckingFunction(file)
     
        //    Check file size
        if (file.size > CONSTANTS.MAX_FILE_SIZE) {
            return res.status(400).json({ 
                message: CONSTANTS.ERRORS.FILE_SIZE_EXCEEDED,
                code: 'FILE_TOO_LARGE'
            });
        }

        logger.info('Uploading note', { postedBy, branch, semester, subject, fileName: file.originalname });

        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        const { data } = await google.drive({ version: "v3", auth }).files.create({
            media: {
                mimeType: file.mimeType,
                body: bufferStream,
            },
            requestBody: {
                name: file.originalname,
                parents: [process.env.GOOGLE_DRIVE_PARENT]
            },
            fields: "id,name"
        });
 
        const newNotes = new Notes({
            postedBy,
            branch,
            semester,
            subject,
            file: `https://drive.google.com/file/d/${data.id}`,
            fileName: data.name,
        });
        await newNotes.save();

        logger.info('Note uploaded successfully', { noteId: newNotes._id });
        res.status(201).json(newNotes)
    }
    catch (error) {
        if(error.type === "zodError") {
            logger.warn('Validation error in uploadNotes', { message: error.message });
            res.status(400).json({ message: error.message, code: 'VALIDATION_ERROR' });
            return
        }
        logger.error('Error in uploadNotes', { message: error.message, stack: error.stack });
        res.status(500).json({ message: CONSTANTS.ERRORS.SERVER_ERROR });
    }
}

// //get tall notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find()
        if (!notes) return res.status(400).json({ error: "Notes not found" });

        res.status(200).json(notes);
    }

    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}


const getNotesSem = async (req, res) => {
    const { branch, semester } = req.params;
    try {
        // Find notes based on branch and semester
        const notes = await Notes.find({ branch: branch, semester: semester });

        // Check if notes were found
        // if (notes.length === 0) {
        //     return res.status(404).json({ error: "Notes not found" });
        // }

        // If notes found, return them
        res.status(200).json(notes);
    }

    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}

// //get the specific post by id
const getNotes = async (req, res) => {
    const { branch } = req.params;
    try {
        const notes = await Notes.find({ branch })
        if (!notes) return res.status(400).json({ error: "Notes not found" });

        res.status(200).json(notes);
    }

    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}

const getNotesPostedBy = async (req, res) => {
    const { postedBy } = req.params;
    try {
        const notes = await Notes.find({ postedBy });
        if (!notes) return res.status(400).json({ error: "Notes not found" });
        res.status(200).json(notes);
    }

    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotesPostedBy', error.message)
    }
}

const getNotesSemSub = async (req, res) => {
    const { branch, semester, subject } = req.params;
    try {
        // Find notes based on branch and semester
        const notes = await Notes.find({ branch: branch, semester: semester, subject: subject });

        // Check if notes were found
        if (notes.length === 0) {
            return res.status(404).json({ error: "Notes not found" });
        }

        // If notes found, return them
        res.status(200).json(notes);
    }

    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}

const deletePost = async (req, res) => {
    try {
        const notes = await Notes.findById(req.params.id);

        if (!notes) {
            return res.status(404).json({ message: 'notes not Found' });
        }
        const filedelete = notes.file;
        const filesplit = filedelete.split('/').pop();

        const { data } = await google.drive({ version: "v3", auth }).files.delete({
            fileId: filesplit,
        })

        // console.log(data);
        await Notes.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Post Deleted successfull' })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in deletePost', error.message)
    }
}

module.exports = { uploadNotes, getAllNotes, getNotesPostedBy, getNotes, getNotesSem, getNotesSemSub,deletePost };















