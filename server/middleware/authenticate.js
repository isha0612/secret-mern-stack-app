const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const { verifyAuthToken } = require('../utils/jwt');
const mongoose = require('mongoose');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("COOKIE ", token);

        const verifyToken = verifyAuthToken(token);

        const rootUser = await User.findOne({ _id: verifyToken._id });

        if (!rootUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req._id = rootUser._id;

        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = Authenticate;