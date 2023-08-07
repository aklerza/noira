const router = require("express").Router()
const authMiddleWare = require("../middlewares/auth")
const {threadList,threadOne,threadAddComment,threadDeleteComment,threadNew,threadDelete, viewComment, lastComments, threadInfo} = require('../controllers/content-view.controller')

router.get('/threads', threadList)

router.get('/thread/comment/last', lastComments)

router.get('/thread/view', threadOne)

router.get('/thread/info', threadInfo)

router.post('/thread/comment', authMiddleWare.whoisToken, threadAddComment)

router.delete('/thread/comment', authMiddleWare.whoisToken, threadDeleteComment)

router.post('/thread/new', authMiddleWare.whoisToken, threadNew)

router.delete('/thread', authMiddleWare.whoisToken, threadDelete)

router.get('/thread/comment/view', viewComment)

module.exports = router