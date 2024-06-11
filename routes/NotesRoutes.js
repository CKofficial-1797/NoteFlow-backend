const express = require('express');
const { uploadNotes,getNotes,getNotesSem, getNotesSemSub, getAllNotes } = require('../controllers/NotesController');
const singleUpload = require('../middleware/multer');

const router = express.Router();

router.get('/allnotes', getAllNotes)
router.get('/:branch', getNotes)
router.get('/:branch/:semester', getNotesSem);
router.get('/:branch/:semester/:subject', getNotesSemSub);
router.post('/upload',singleUpload, uploadNotes)
// router.delete('/:id', ProtectUser, deletePost)

module.exports = router;