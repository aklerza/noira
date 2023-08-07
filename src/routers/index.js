const router = require('express').Router()

const auth = require('./auth.routes')
const content_management = require('./content-management.routes')
const content_view = require('./content-view.routes')
const publicdata = require('./public.routes')

router.use(auth)
router.use(content_management)
router.use(content_view)
router.use(publicdata)

module.exports = router