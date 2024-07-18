const express = require("express");
const productController = require("../controller/productController");
const productRouter = express.Router();

productRouter.get("/", productController.getProduct);
productRouter.patch("/", productController.updateProductStock);
module.exports = productRouter;
