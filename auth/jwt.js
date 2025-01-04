const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET_KEY );
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        return undefined;
    }
}
module.exports = {generateToken, verifyToken}