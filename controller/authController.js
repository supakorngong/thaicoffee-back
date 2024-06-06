const hashService = require("../service/hashService");
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
module.exports = authController;
