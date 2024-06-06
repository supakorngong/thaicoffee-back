const express = require("express");
const { registerValidator } = require("../middleware/validator");
const authController = require("../controller/authController");
const authRouter = express.Router();

authRouter.post("/login", (req, res, next) => {
  console.log("login success");
});
authRouter.post("/register", authController.register);

module.exports = authRouter;
