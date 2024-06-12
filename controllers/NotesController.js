const Notes = require("../models/NotesModel");
const { google } = require('googleapis')
const path = require('path')
const stream = require('stream');
const { fileUplodeSchemaFunction } = require("../backendValidation/Schema");

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
        //    Check file size
        const MAX_SIZE = 40 * 1024 * 1024; // 40MB
        if (file.size > MAX_SIZE) {
            return res.status(400).json({ message: "File size exceeds 40MB limit" });
        }
        if (!postedBy) {
            return res.status(400).json({ message: 'PostedBy and fies upload fields are required' })
        }
        if (!branch || !semester || !subject || !file) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        // const user = await User.findById(postedBy);
        // if (!user) return res.status(404).json({ message: 'User not found' });

        // if (user._id.toString() !== req.user._id.toString()) {
        //     return res.status(401).json({ message: 'Unauthorized to create post' })
        // }

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

        res.status(200).json(newNotes)

      
    }
    catch (error) {
      
        if(error.type === "zodError") {
            res.status(400).json({ message: error.message });
            return

        }
          res.status(500).json({ message: error.message });
        console.log('Error in uploadNotes', error.message)
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

// //get the specific post by id
const getNotes = async (req, res) => {
    const { branch } = req.params
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

// //delete the specific post by id 
// const deletePost = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);

//         if (!post) {
//             return res.status(404).json({ message: 'Post not Found' });
//         }

//         if (post.postedBy.toString() !== req.user._id.toString()) {
//             return res.status(400).json({ message: 'Unauthorized to delete post' });
//         }

//         await Post.findByIdAndDelete(req.params.id);

//         res.status(200).json({ message: 'Post Deleted successfull' })
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//         console.log('Error in deletePost', error.message)
//     }
// }

module.exports = { uploadNotes, getAllNotes, getNotes, getNotesSem, getNotesSemSub };















