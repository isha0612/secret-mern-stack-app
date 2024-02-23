const nodemailer = require('nodemailer');
const User = require('../models/userSchema');
const {generateAuthToken} = require('../utils/jwt');

const forgetPassword = async (req, res) => {
    const {email} = req.body;
    console.log(email);

    if(!email) {
        return res.status(422).json({error: "Please fill all the fields"});
    }

    try {
        const userExist = await User.findOne({ email: email });

        if(!userExist) {
            return res.status(422).json({error: "User does not exist"});
        }

        const token = generateAuthToken({ _id: userExist._id });
        console.log("TOKEN : " + token);

        // res.cookie('jwtoken', token, {
        //     maxAge: 900000,
        //     httpOnly: false,
        //     secure: true
        // });

        const transporter = await nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.PORT,
            service: process.env.SERVICE,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD
            }
        });
    
        const info = await transporter.sendMail({
            from: 'ishagupta062002@gmail.com',
            to: email,
            subject: "Reset password",
            text: `Click on this link to set a new password for your account - ${process.env.REACT_URL}/reset-password/${userExist._id}?jwtoken=${token}`,
        });
    
        console.log("Message sent: %s", info.messageId);
        res.status(201).json({message: "Reset password link sent successfully!!!!"});
    }
    
    catch(err) {
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
}

module.exports = forgetPassword;