const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    },
    context: {
        type: String,
        required: true,
        trim: true
    },
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'threads',
        required: true
    }
}, {timestamps: true})

const comment = mongoose.model("comments", commentSchema)

module.exports = comment