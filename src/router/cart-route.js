const express = require("express");
const cartController = require("../controller/cartController");
const cartRouter = express.Router();

cartRouter.post("/", cartController.createOrUpdateCart);
cartRouter.get("/", cartController.getCartData);
cartRouter.delete("/:cartId", cartController.deleteCartData);

module.exports = cartRouter;
