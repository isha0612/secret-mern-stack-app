const Secret = require('../models/secretSchema');

const get_secrets = async (req, res) => {
    try {
        const secrets = await Secret.find().sort({timeStamp: 1});
        console.log("SECRETS ", secrets);
        res.status(200).send(secrets);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
}

const post_secrets = async (req, res) => {
    try {
        const {secret} = req.body;
        console.log(secret);

        if(!secret) {
            return res.status(422).json({error: "Please fill all the fields"});
        }

        await Secret.create({secret: secret});
        res.status(201).json({message: "Secret submitted successfully!!!!"});
    }
    catch(err) {
        return res.status(422).json({err});
    }
}

module.exports = {get_secrets, post_secrets};