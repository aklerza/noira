const category = require('../models/category.model')
const subcategory = require('../models/subcategory.model')
const response = require("../utils/response")

const addCategory = async (req, res) => {
    const {name} = req.body
    if (!name) {
        return res.json( response.error("Yetərsiz detal.", 404) )
    }
    try {
        const newCategory = new category({name})
        await newCategory.save()
            .then((resp) => {
                res.json( response.success("Kateqoriya yaradıldı.", {}, 200) )
            })
            .catch((err) => {
                res.json( response.error("Xəta.", 408) )
            })
    } catch (err) {
        res.json( response.error("Xəta.", 408) )
        console.log("[-] Kateqoriya əlavə olunarkən xəta yaşandı.")
    }
}

const addSubCategory = async (req, res) => {
    const {name, parent} = req.body
    if (!parent || !name) {
        return res.json( response.error("Yetərsiz detal.", 404) )
    }
    const parentCat = await category.findOne({name: parent})
    if (! parentCat) {
        return res.json( response.error("Yetərsiz detal.", 404) )
    }
    try {
        const newSubCategory = new subcategory({name})
        parentCat.subCategoriesId.push(newSubCategory)
        newSubCategory.save()
            .then((resp) => {
                res.json( response.success("sub-Kateqoriya yaradıldı.", {}, 200) )
            })
            .catch((err) => {
                res.json( response.error("Xəta.", 408) )
            })
        parentCat.save()
    } catch (err) {
        res.json( response.error("Xəta.", 408) )
        console.log("[-] sub-Kateqoriya əlavə olunarkən xəta yaşandı.")
    }
}

const delCategory = async (req, res) => {
    const {name} = req.body
    if (!name) {
        return res.json( response.error("Yetərsiz detal.", 404) )
    }
    try {
        await category.deleteOne({name})
            .then((resp) => {
                res.json( response.success("Kateqoriya silindi.", 200) )
            })
            .catch((err) => {
                res.json( response.error("Xəta.", 404) )
            })
    } catch (err) {
        res.json( response.error("Xəta.", 408) )
        console.log("[-] Kateqoriya silinərkən xəta yaşandı.")
    }
}

const delSubCategory = async (req, res) => {
    const {name} = req.body
    if (!name) {
        return res.json( response.error("Yetərsiz detal.", 404) )
    }
    try {
        await subcategory.deleteOne({name})
            .then((resp) => {
                res.json( response.success("sub-Kateqoriya silindi.", 200) )
            })
            .catch((err) => {
                res.json( response.error("Xəta.", 404) )
            })
    } catch (err) {
        res.json( response.error("Xəta.", 408) )
        console.log("[-] sub-Kateqoriya silinərkən xəta yaşandı.")
    }
}

module.exports = {
    addCategory,
    addSubCategory,
    delCategory,
    delSubCategory
}