const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    context: {
        type: String,
        required: true,
        trim: true
    },
    parentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'subcategories',
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'comment'
    }]
},{timestamps: true})

const thread = mongoose.model("threads", threadSchema)

module.exports = thread