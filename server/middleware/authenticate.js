const User = require('../models/userSchema');
const { verifyAuthToken } = require('../utils/jwt');
const mongoose = require('mongoose');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const verifyToken = verifyAuthToken(token);

        if (!verifyToken) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const rootUser = await User.findOne({ _id: verifyToken._id });

        if (!rootUser) {
            return res.status(401).json({ error: "User does not exist" });
        }

        req.token = token;
        req.rootUser = rootUser;
        req._id = rootUser._id;

        next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = Authenticate;