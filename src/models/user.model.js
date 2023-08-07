const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
        trim: true
    },
    message_count: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: "Basic",
        trim: true
    }
},{collection: "users", timestamps: true})

const user = mongoose.model("users", userSchema)

module.exports = user