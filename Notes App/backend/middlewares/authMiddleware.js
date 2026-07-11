const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        let token;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
        }

        if (!token)
            return res
                .status(403)
                .json({ message: "authentication failed. No token found." });

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid token." });
            req.userId = decoded.userId;
            next();
        });
    } catch (err) {
       return res.status(500).json({ error: `${err}` })
    }
};

module.exports = verifyToken;
