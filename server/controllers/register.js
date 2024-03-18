const User = require("../models/userSchema");
const { generateAuthToken } = require("../utils/jwt");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { email, password1, passsword2 } = req.body;

    if (!email || !password1 || !passsword2) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    if (password1 !== passsword2) {
        return res.status(422).json({ error: "Passwords do not match" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "User already exists" });
        }

        const pd = await bcrypt.hash(password1, 10);
        const user = await User.create({ email: email, password: pd });

        if (!user) {
            return res.status(500).json({ error: "Error creating user" });
        }

        const token = generateAuthToken({ _id: user._id });
        return res.status(201).json({ message: "User registered successfully", jwtoken: token });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = register;