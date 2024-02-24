const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res) => {
    const {id} = req.params; 
    console.log(id);
    const { password1 } = req.body;

    if(!password1) {
        return res.status(422).json({error: "Please fill all the fields"});
    }

    try {
        const userExist = await User.findOne({ _id: id });
        console.log(userExist);

        if(!userExist) {
            return res.status(422).json({error: "User does not exist"});
        }

        const password = await bcrypt.hash(password1, 10);

        await User.findByIdAndUpdate(id, {password: password});
        res.status(201).json({message: "Password reset successfully!!!!"});
    }

    catch(err) {
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
}

module.exports = resetPassword;