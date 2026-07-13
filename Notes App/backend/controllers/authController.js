const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const signupSchema = require("../config/signupSchema");
require("dotenv").config();

const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body; // cleaned request body from the signupMiddleware.

        const existUser = await User.findOne({ email: email });
        if (existUser) {
            return res.status(400).json({ message: "email already exists." });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPass,
        });

        newUser.password = undefined; // hiding the hashed password before sending the response.

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        );
        res.status(201).json({
            message: "User created",
            user: newUser,
            token: token,
        });
    } catch (err) {
        res.status(500).json({ error: `${err.message}` });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existsUser = await User.findOne({
            $or: [{ email: email }, { username: username }],
        }).select("+password");
        if (!existsUser) {
            return res
                .status(400)
                .json({
                    message:
                        "user doesn't exist. Signup to start taking notes.",
                });
        }
        const matchPass = await bcrypt.compare(password, existsUser.password);
        if (!matchPass) {
            return res
                .status(400)
                .json({ message: "Wrong username/email or password " });
        }

        const sessionToken = jwt.sign(
            { userId: existsUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        );
        existsUser.password = undefined;
        res.status(200).json({
            message: "Logged in successfully",
            user: existsUser,
            token: sessionToken,
        });
    } catch (err) {
        res.status(500).json({ error: `${err.message}` });
    }
};

module.exports = { signupUser, loginUser };
