const joi = require('joi')

const register_userCred = joi.object().keys({
    nickname: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email({minDomainSegments:2 }).required(),
    password: joi.string()
    .min(8)
    .max(64)
    .required()
    .messages({
      "string.pattern.base": `Şifrəniz ən az 8, maksimum 64 xanadan ibarət ola bilər.`,
      "string.empty": `Şifrə boş ola bilməz.`,
      "any.required": `Şifrə boş ola bilməz.`,
    }),
})

const login_userCred = joi.object().keys({
    email: joi.string().email({minDomainSegments:2 }).required(),
    password: joi.string()
    .min(8)
    .max(64)
    .required()
    .messages({
      "string.pattern.base": `Şifrəniz ən az 8, maksimum 64 xanadan ibarət ola bilər.`,
      "string.empty": `Şifrə boş ola bilməz.`,
      "any.required": `Şifrə boş ola bilməz.`,
    }),
})

module.exports = {
    register_userCred,
    login_userCred
}