const express = require("express");
const authRouter = express.Router();
const { signupUser, loginUser } = require("../controllers/authController");
const signupSchema = require("../config/signupSchema");
const validateSchema = require("../middlewares/singupMiddleware");

authRouter.route("/signup").post(validateSchema(signupSchema), signupUser);
authRouter.route("/login").post(loginUser);
module.exports = authRouter;
