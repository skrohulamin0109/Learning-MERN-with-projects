const Joi = require("joi");

const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

module.exports = signupSchema;
