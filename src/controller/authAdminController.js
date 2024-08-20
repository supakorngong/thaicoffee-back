const hashService = require("../service/hashService");
const jwtService = require("../service/jwtService");
const userService = require("../service/userService");
const createNewError = require("../utils/createError");

const authAdminController = {};

authAdminController.login = async (req, res, next) => {
  try {
    const data = req.input;
    const existUser = await userService.findUserByEmail(data.email);
    if (!existUser) {
      console.log("ahhahahaha");
      createNewError({ message: "invalid credentials", statusCode: 400 });
    }
    if (!existUser.isAdmin) {
      createNewError({ message: "you are not an admin", statusCode: 400 });
    }
    const passwordMatched = await hashService.compare(data.password, existUser.password);

    if (!passwordMatched) {
      createNewError({ message: "invalid credentials password" });
    }
    const accessToken = jwtService.sign({ id: existUser.user_id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

module.exports = authAdminController;
