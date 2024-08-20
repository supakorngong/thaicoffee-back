const jwtService = require("../service/jwtService");
const userService = require("../service/userService");
const createNewError = require("../utils/createError");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      createNewError({ message: "unauthorized", statusCode: 401 });
    }
    const accessToken = authorization.split(" ")[1];
    const payLoad = jwtService.verify(accessToken);

    const foundUser = await userService.findUserById(payLoad.id);
    if (!foundUser) {
      createNewError({ message: "user not found", statusCode: 400 });
    }
    delete foundUser.password;

    req.user = foundUser;

    next();
  } catch (err) {
    next(err);
  }
};
module.exports = authenticate;
