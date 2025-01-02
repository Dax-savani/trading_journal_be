const {verifyToken} = require("../auth/jwt");
const User = require('../models/users');

async function auth(req, res, next) {
    try {
        const authToken = req.cookies?.token;
        if (!authToken) {
            return res.status(401).json({
                message: "Unauthorized: Auth token not found!",
                status: 401
            });
        }
        const user = await verifyToken(authToken);
        const verifiedUser = await User.findByPk(user.id);
        if (!verifiedUser) {
            return res.status(401).json({
                message: "Unauthorized: Auth token is invalid!",
                status: 401
            });
        }
        req.user = verifiedUser;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({
            message: "Internal server error in authentication middleware",
            status: 500
        });
    }
}

module.exports = {auth};
