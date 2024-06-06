const express = require("express");
const authController = require("../controller/authController");
const { registerValidator, loginValidator } = require("../middleware/validator");
const authRouter = express.Router();

authRouter.post("/register", registerValidator, authController.register);
authRouter.post("/login", loginValidator, authController.login);

module.exports = authRouter;
