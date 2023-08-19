const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

function createToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        userPW: user.userPW
    },

    process.env.SECRET_KEY,
    {
        expiresIn: '1h'
    });
};

module.exports = {
    createToken
}