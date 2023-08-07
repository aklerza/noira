const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    subCategoriesId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategories'
    }]
},{timestamps: true})

const category = mongoose.model("categories", categorySchema)

module.exports = category