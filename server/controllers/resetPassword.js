const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {verifyAuthToken} = require('../utils/jwt');

const resetPassword = async (req, res) => {
    const {id} = req.params; 
    const jwtoken= req.query.jwt;
    console.log("JWT ",jwtoken)
    console.log(id);
    const { password1 } = req.body;

    if(!password1) {
        return res.status(422).json({error: "Please fill all the fields"});
    }

    try {
        const payload = verifyAuthToken(jwtoken);
        if(payload._id !== id) {
            return res.status(422).json({error: "Invalid user"});
        }
        const userExist = await User.findOne({ _id: id });
        console.log(userExist);

        if(!userExist) {
            return res.status(422).json({error: "User does not exist"});
        }

        // const salt = await bcrypt.genSalt(process.env.SALT);
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