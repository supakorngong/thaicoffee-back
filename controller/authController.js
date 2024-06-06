const hashService = require("../service/hashService");
const jwtService = require("../service/jwtService");
const userService = require("../service/userService");
const createNewError = require("../utils/createError");

const authController = {};
authController.register = async (req, res, next) => {
  try {
    const data = req.input;
    //checkก่อนว่าซํ้ามั้ย
    const existUser = await userService.findUserByEmail(data.email);
    if (existUser) {
      createNewError({ message: "this email already registered", statusCode: 400 });
    }
    data.password = await hashService.hash(data.password);
    await userService.createUser(data);
    res.status(200).json({ message: "registered success" });
  } catch (err) {
    next(err);
  }
};
authController.login = async (req, res, next) => {
  try {
    const data = req.input;
    console.log(data);
    const existUser = await userService.findUserByEmail(data.email);
    console.log(existUser);
    if (!existUser) {
      createNewError({ message: "invalid credentials", statusCode: 400 });
    }
    const passwordMatched = hashService.compare(data.password, existUser.password);
    if (!passwordMatched) {
      createNewError({ message: "invalid credentials password" });
    }
    console.log("this is user Id", existUser.user_id);
    const accessToken = jwtService.sign({ id: existUser.user_id });
    res.status(200).json(accessToken);
  } catch (err) {
    next(err);
  }
};
module.exports = authController;
