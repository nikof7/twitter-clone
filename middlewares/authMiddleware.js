const { expressjwt: checkJwt } = require("express-jwt");

const authMiddleware = checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] });

module.exports = authMiddleware;
