const router = require("express").Router()
const {login, register, forgot_password} = require('../controllers/auth.controller')

router.post('/login', login)

router.post('/register', register)

// router.post('/forgot_password', forgot_password)

module.exports = router