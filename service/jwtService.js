const jwt = require("jsonwebtoken");
const jwtService = {};
jwtService.sign = (payload) => jwt.sign(payload, process.env.secret_key, { expiresIn: "7d" });
jwtService.verify = (token) => jwt.verify(token, process.env.secret_key);
module.exports = jwtService;
