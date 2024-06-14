const express = require('express');
const { uploadNotes,getNotes,getNotesSem, getNotesSemSub, getAllNotes, deletePost, getNotesPostedBy } = require('../controllers/NotesController');
const singleUpload = require('../middleware/multer');

const router = express.Router();

router.get('/allnotes', getAllNotes)
router.get('/:branch', getNotes)
router.get('/name/:postedBy', getNotesPostedBy)
router.get('/:branch/:semester', getNotesSem);
router.get('/:branch/:semester/:subject', getNotesSemSub);
router.post('/upload',singleUpload, uploadNotes)
router.delete('/delete/:id', deletePost)

module.exports = router;