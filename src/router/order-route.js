const express = require("express");
const orderController = require("../controller/orderController");
const upload = require("../middleware/upload");
const orderRouter = express.Router();

orderRouter.post("/", upload.single("evidence"), orderController.createOrder);
orderRouter.get("/", orderController.getAllOrder);
orderRouter.get("/items", orderController.getOrderByUserId);
orderRouter.patch("/:orderId", orderController.updateOrder);

module.exports = orderRouter;
