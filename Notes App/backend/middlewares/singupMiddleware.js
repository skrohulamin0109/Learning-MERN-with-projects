const signupSchema = require("../config/signupSchema");

// this is a function returning another function.
const validateSchema = (signupSchema) => (req, res, next) => {
    const { err, value } = signupSchema.validate(req.body, {
        abortEarly: false,
    });

    if (err)
        return res
            .status(400)
            .json({ error: err.details.map((d) => d.message) });

    req.body = value; // we are injecting the sanitized data in the req.body so now after the sanitization the req.body can be passed to the controller from the routes.
    // The request body in the controller will already be cleaned and ready to use normally.

    next(); // after the check we only allow to go furter in the singup route. so we already get the polished signup object.
};

module.exports = validateSchema;
