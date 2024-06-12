const mongoose = require('mongoose')

const schema = mongoose.Schema;

const NotesSchema = new schema({
    postedBy:{
        type: String,
        required: [true, "Email is required."],
        match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
    },
    branch:{
        type: String,
        required: [true, "branch is required."],
    },
    semester: {
        type: String,
        required: [true, "semester is required."],
    },
    subject:{
        type: String,
        required: [true, "subject is required."],
    },
    file:{
        type: String,
        required: [true, "file is required."],
    },
    fileName:{
        type: String,
    },
},{
    timestamps: true,
})

const notes = mongoose.model('notes', NotesSchema)

module.exports = notes;