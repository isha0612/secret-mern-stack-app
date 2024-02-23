const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res) => {
    const { id } = req.params;
    const { password1 } = req.body;

    if(!password1) {
        return res.status(422).json({error: "Please fill all the fields"});
    }

    try {
        const userExist = await User.findOne({ _id: id });

        if(!userExist) {
            return res.status(422).json({error: "User does not exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(password1, salt);

        await User.findByIdAndUpdate(id, {password: password});
        res.status(201).json({message: "Password reset successfully!!!!"});
    }

    catch(err) {
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
}

module.exports = resetPassword;