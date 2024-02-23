const jwt = require('jsonwebtoken');

const verifyAuthToken = (payload) => {
    return jwt.verify(payload, process.env.JWTSECRET)
}

const generateAuthToken = (payload) => {
    return jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: '1h'
    });
}

module.exports = {
    generateAuthToken,
    verifyAuthToken
}