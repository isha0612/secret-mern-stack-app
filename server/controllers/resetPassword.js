const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res) => {
    const id1 = req._id.toString(); 
    const id2 = req.query.id;
    console.log("ID1 : ",id1);
    console.log("ID2 : ",id2);

    if(id1 !== id2) {   
        return res.status(401).json({error: "Unauthorized"});
    }
    const { password1 } = req.body;

    if(!password1) {
        return res.status(422).json({error: "Please fill all the fields"});
    }

    try {
        const userExist = await User.findOne({ _id: id1 });
        console.log(userExist);

        if(!userExist) {
            return res.status(422).json({error: "User does not exist"});
        }

        const password = await bcrypt.hash(password1, 10);

        await User.findByIdAndUpdate(id1, {password: password});
        res.status(201).json({message: "Password reset successfully!!!!"});
    }

    catch(err) {
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
}

module.exports = resetPassword;