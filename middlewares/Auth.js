const jwt = require("jsonwebtoken");
const { Errors } = require("../utils/wrapper");

exports.requireUser = async (req, res, next) => {
    try {
        const authHeader = req.headers || req?.headers?.authorization;
        const token = authHeader?.authorization?.split(" ")[1];
        console.log("token is : ", token);

        if (!token) {
            return res.send(Errors(401, "token is missing"));
        }

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SIGNATURE);
        
        if (user) {
            req.user = user;
            next();
        } else {
            return res.send(Errors(404, "user is not authorized"));
        }
    } catch (error) {
        return res.send(Errors(500, error.message));
    }
};
