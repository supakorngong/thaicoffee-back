const cartService = require("../service/cartService");

const cartController = {};

cartController.createOrUpdateCart = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { product_id, amount } = req.body;
    const foundCart = await cartService.findCart(user_id, product_id);

    const input = { cartId: foundCart?.cart_id || 0, productId: product_id, amount, userId: user_id };
    const result = await cartService.insertToCart(input);

    res.status(200).json("add to cart already");
  } catch (err) {
    next(err);
  }
};

cartController.getCartData = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const result = await cartService.findCartData(user_id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

cartController.deleteCartData = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    await cartService.deleteCart(+cartId);
    res.status(200).json({ message: "delete success" });
  } catch (err) {
    next(err);
  }
};
module.exports = cartController;
