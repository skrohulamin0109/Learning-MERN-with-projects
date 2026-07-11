const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }
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

const loginUser = () => {};

const logoutUser = () => {};

module.exports = { signupUser, loginUser, logoutUser };
