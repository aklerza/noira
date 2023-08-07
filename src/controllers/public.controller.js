const user = require('../models/user.model')
const response = require('../utils/response')

const viewUser = async (req, res) => {
    const {id} = req.body;
    const payload = await user.findOne({_id: id})
    if (payload) {
        const data = {
            _id: payload._id,
            nickname: payload.nickname,
            createdAt: payload.createdAt,
            messageCount: payload.message_count
        }
        return res.json( response.success("", {data}, 200) )
    }
    return res.json( response.error("Not Found", 404) )
}

module.exports = {
    viewUser
}