const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
},{collection: "subcategories", timestamps: true})

const subcategory = mongoose.model("subcategories", subCategorySchema)

module.exports = subcategory