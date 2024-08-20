const jwtService = require("../service/jwtService");
const userService = require("../service/userService");
const createNewError = require("../utils/createError");

const authenticateAdmin = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    console.log(authorization);
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
    if (!foundUser.isAdmin) {
      createNewError({ message: "you are not admin", statusCode: 400 });
    }
    req.user = foundUser;

    next();
  } catch (err) {
    next(err);
  }
};
module.exports = authenticateAdmin;
