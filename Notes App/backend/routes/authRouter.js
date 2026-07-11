const express = require('express');
const authRouter = express.Router()
const {signupUser, loginUser, logoutUser} = require('../controllers/authController');

authRouter.route('/signup').post(signupUser)
authRouter.route('/login').post(loginUser)
authRouter.route('/logout').post(logoutUser)
module.exports = authRouter;