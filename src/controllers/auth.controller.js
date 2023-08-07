const user = require("../models/user.model")
const response = require("../utils/response")
const joiSchemas = require("../utils/joiSchemas")
const joi = require("joi")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const userOnDB = await user.findOne({ email });

        const result = joiSchemas.login_userCred.validate({ email, password });
        const { value, error } = result;
        const valid = error == null;
        if (!valid) {
            return res.json(response.error("Illegal istifadəçi detalları.", 400));
        }

        if (!userOnDB) {
            return res.json(response.error("Xətalı şifrə və ya e-poçt.", 401))
        };

        const passCheck = await bcrypt.compare(password.toString(), userOnDB.password);
        if (passCheck) {
            const userToken = jwt.sign({ _id: userOnDB._id }, process.env.SECRET);
            return res.header("Authorization", "Bearer " + userToken).json(response.validation(userToken, 200))
        } else {
            return res.json(response.error("Xətalı şifrə və ya e-poçt.", 401));
        };
    } catch (err) {
        console.log(err);
        return res.json(response.error("Bilinməyən Xəta.", 404));
    }
}

const register = async (req, res) => {
    try {
        const { nickname, email } = req.body;
        const result = joiSchemas.register_userCred.validate({ nickname, email, password: req.body.password });
        const { value, error } = result;
        const valid = error == null;
        if (!valid) {
            return res.json(response.error("Illegal istifadəçi detalları.", 400));
        }
        const password = await bcrypt.hash(req.body.password, 8)

        const nameCheck = await user.findOne({ nickname });
        const mailCheck = await user.findOne({ email });

        if (nameCheck) {
            return res.json(response.error("İstifadəçi adı alınıb.", 409))
        }

        if (mailCheck) {
            return res.json(response.error("Bu e-poçt ilə qeydiyyatdan keçilib.", 409))
        }

        const payload = {
            nickname,
            email,
            password
        }

        try {
            const loadUser = new user(payload)
            await loadUser.save()
                .then((resp) => {
                    const userToken = jwt.sign({ _id: userOnDB._id }, process.env.SECRET);
                    return res.header("Authorization", "Bearer " + userToken).json(response.validation(userToken, 200))
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }


        return res.json(response.error("Bilinməyən Xəta.", 404));
    } catch (err) {
        console.log(err);
        return res.json(response.error("Bilinməyən Xəta.", 404));
    }
}

const forgot_password = async (req, res) => {
    console.log(req.body);
    return res.json(req.body);
}

module.exports = {
    login,
    register,
    forgot_password
}