const User = require('../models/userSchema');
const { generateAuthToken } = require('../utils/jwt');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (!userExist) {
            return res.status(422).json({ error: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);

        if (!isMatch) {
            return res.status(422).json({ error: "Invalid credentials" });
        }

        const token = generateAuthToken({ _id: userExist._id });
        return res.status(201).json({ message: "User logged in successfully", jwtoken: token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = login;