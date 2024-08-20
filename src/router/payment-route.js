const express = require("express");
const paymentController = require("../controller/paymentController");
const orderController = require("../controller/orderController");
const authenticate = require("../middleware/authenticate");
const paymentRouter = express.Router();

paymentRouter.post("/checkout", authenticate, orderController.createOrderByCredit, paymentController.checkout);

module.exports = paymentRouter;
