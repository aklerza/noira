const router = require("express").Router()
const authMiddleWare = require("../middlewares/auth")
const { addCategory, addSubCategory, delCategory, delSubCategory } = require("../controllers/content-management.controller")

router.post('/category', authMiddleWare.whoisToken, authMiddleWare.checkAdmin, addCategory)
router.post('/subcategory', authMiddleWare.whoisToken, authMiddleWare.checkAdmin, addSubCategory)

router.delete('/category', authMiddleWare.whoisToken, authMiddleWare.checkAdmin, delCategory)
router.delete('/subcategory', authMiddleWare.whoisToken, authMiddleWare.checkAdmin, delSubCategory)

module.exports = router