const thread = require('../models/thread.model')
const comment = require('../models/comment.model')
const subcategory = require('../models/subcategory.model')
const response = require("../utils/response")
const perPage = 10

const threadList = async (req, res) => {
    try {
        const pageId = Math.max(0, req.body.page)
        const paginatedThreads = await thread
            .find({},
                {
                    comments: 0,
                    context: 0
                }
            )
            .sort({ createdAt: -1 })
            .limit(perPage)
            .skip(perPage * pageId)
        return res.json(response.success("", { threads: paginatedThreads }, 200))
    } catch (err) {
        console.log(err);
        return res.json(response.error("Bilinməyən Xəta.", 404));
    }
}

const threadOne = async (req, res) => {
    try {
        const threadId = req.body.id || 0
        const threadData = await thread
            .find({
                _id: threadId
            })
        if (threadData) {
            return res.json(response.success("", { thread: threadData }, 200))
        }
        return res.json(response.error("Tapılmadı.", 404))
    } catch (err) {
        console.log(err);
        return res.json(response.error("Bilinməyən Xəta.", 404));
    }
}

const threadAddComment = async (req, res) => {
    try {

        const { context, threadId } = req.body;

        const threadParent = await thread.findOne({_id: threadId})
        if (!threadParent) {
            return res.json( response.error("Belə bir thread mövcud deyil.", 404) )
        };

        const userComment = new comment({
            author: req.user._id,
            context: context,
            parent: threadId
        })

        await userComment.save()

        threadParent.comments.push(userComment)
        threadParent.save()
            .then((resp) => {
                return res.json( response.success("Mesajınız göndərildi.", {}, 200) )
            })
            .catch((err) => {
                return res.json( response.error("Göndərilmədi.", 503) )
            })
        
    } catch (err) {
        console.log(err);
        return res.json(response.error("Bilinməyən Xəta.", 404));       
    }
}

const threadDeleteComment = async (req, res) => {
    try {
        const payloadComment = await comment.findOne({_id: req.body.id})

        if (!payloadComment) {
            return res.json( response.error("Belə bir ismarıc mövcud deyil.", 404) )
        };

        if (payloadComment.author.toString() == req.user._id.toString()) {
            const parentThread = await thread.findOne({_id: payloadComment.parent})
            await parentThread.comments.pull({_id: payloadComment._id})
            await parentThread.save()
            await comment.deleteOne({_id: req.body.id})
                .then((resp) => { 
                    return res.json( response.success("Silindi.", {}, 200))
                })
                .catch((err) => {
                    return res.json( response.error("Xəta", 500) )
                })
        }

    } catch (err) {
        console.log(err);
        return res.json(response.error("Bilinməyən Xəta.", 404));       
    }
}

const threadNew = async (req, res) => {
    try {
        if (req.user) {
            const { title, context, categoryId } = req.body;

            const payloadCategory = await subcategory
                .find({
                    _id: categoryId
                })

            if (!payloadCategory) {
                return res.json(response.error("Belə bir sub-kateqoriya yoxdur.", 404))
            }

            const payload = {
                title: title,
                context: context,
                parentId: categoryId,
                author: req.user._id
            }

            const newThread = new thread(payload)
            await newThread.save()
                .then((resp) => {
                    return res.json(response.success("Paylaşıldı.", {}, 200))
                })
                .catch((err) => {
                    return res.json(response.error("Bilinməyən Xəta.", 404));
                })
        } else {
            return res.json(response.error("Hesabınız yoxdur.", 401))
        }
    } catch (err) {
        console.log(err);
        return res.json(response.error("Bilinməyən Xəta.", 404));
    }
}

const threadDelete = async (req, res) => {
    try {
        const payloadThread = await thread.findOne({ _id: req.body.id })
        if (!payloadThread) {
            return res.json(response.error("Belə bir thread mövcud deyil.", 404))
        }
        if (req.user._id.toString() == payloadThread.author.toString()) {
            await thread.deleteOne({ _id: req.body.id })
                .then((resp) => {
                    return res.json(response.success("Silindi.", {}, 200))
                })
                .catch((err) => {
                    return res.json(response.error("Bilinməyən Xəta.", 404));
                })
        } else {
            return res.json(response.error("İcazəniz yoxdur.", 401));
        }
    } catch (err) {
        console.log(err);
        return res.json(response.error("Bilinməyən Xəta.", 404));
    }
}

const viewComment = async (req, res) => {
    const {id} = req.body;
    const payload = await comment.findOne({_id: id})
    if (payload) {
        return res.json( response.success("", {payload}, 200) )
    }
    return res.json( response.error("Not Found", 404) )
}

const lastComments = async (req, res) => {
    const data = await comment
        .find({}, {context: 0})
        .sort({createdAt: -1})
        .limit(8)
    if (data) {
        return res.json( response.success("", {data}, 200) )
    }
    return res.json( response.error("Not Found", 404) )
}

const threadInfo = async (req, res) => {
    const {id} = req.body;
    const payload = await thread.findOne({_id: id}, {context:0, comments:0})
    if (payload) {
        return res.json( response.success("", {payload}, 200) )
    }
    return res.json( response.error("Not Found", 404) )
}

module.exports = {
    threadList,
    threadOne,
    threadAddComment,
    threadDeleteComment,
    threadNew,
    threadDelete,
    viewComment,
    lastComments,
    threadInfo
}