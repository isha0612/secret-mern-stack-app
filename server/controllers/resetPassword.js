const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res) => {
    const id1 = req._id.toString();
    const id2 = req.query.id;

    if (id1 !== id2) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { password1, password2 } = req.body;

    if (!password1 || !password2) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    if (password1 !== password2) {
        return res.status(422).json({ error: "Passwords do not match" });
    }

    try {
        const userExist = await User.findOne({ _id: id1 });

        if (!userExist) {
            return res.status(422).json({ error: "User does not exist" });
        }

        const password = await bcrypt.hash(password1, 10);
        const user = await User.findByIdAndUpdate(id1, { password });

        if (!user) {
            return res.status(500).json({ error: "Error resetting password" });
        }

        return res.status(201).json({ message: "Password reset successfully" });
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = resetPassword;