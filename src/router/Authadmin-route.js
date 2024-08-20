const express = require("express");
const { loginValidator } = require("../middleware/validator");
const authAdminController = require("../controller/authAdminController");
const authAdminRouter = express.Router();

authAdminRouter.post("/login", loginValidator, authAdminController.login);

module.exports = authAdminRouter;
