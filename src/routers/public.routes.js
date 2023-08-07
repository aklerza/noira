const router = require("express").Router()
const {viewUser} = require("../controllers/public.controller.js")

router.get('/public/user/view', viewUser)

module.exports = router