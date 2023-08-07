const response = require("../utils/response")
const jwt = require("jsonwebtoken")
const user = require("../models/user.model")

const whoisToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1]
        if (!token) {
            return res.json( response.error("Keçərsiz token.", 403) )
        };

        const decoded = await jwt.verify(token, process.env.SECRET);
        const userDB = await user.findOne({_id: decoded._id});
        if (userDB){
            req.user = userDB;
            next();
        } else {
            return res.json( response.error("Bilinməyən istifadəçi.", 401) )
        };
    } catch (err) {
        return res.json( response.error("İstifadədən kənar token.", 400) )
    }
}

const checkAdmin = async (req, res, next) => {
    try {
        const user = req.user
        if (user.role == "Admin") {
            req.isadmin = true
        } else {
            return res.json( response.error("Zəif icazə.", 401) )
        }
        next()
    } catch(err) {
        return res.json( response.error("Bilinməyən istifadəçi.", 401) )
    }
}

module.exports = {
    whoisToken,
    checkAdmin
}