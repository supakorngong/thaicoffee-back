const cartService = require("../service/cartService");
const orderService = require("../service/orderService");
const uploadService = require("../service/uploadService");
const fs = require("fs/promises");
const createNewError = require("../utils/createError");

const orderController = {};

orderController.createOrder = async (req, res, next) => {
  try {
    // if (!req.file) {
    //   createNewError({ message: "message or image is required", statusCode: 400 });
    // }
    const data = {
      user_id: req.user.user_id,
      totalCost: req.body.totalCost,
    };

    if (req.file) {
      data.evidence = await uploadService.upload(req.file.path); //return secure_url ให้
    }

    const response = await orderService.createOrderFromCart(data); //totalcost evidence === input

    const foundedCart = await cartService.findCartData(+data.user_id);

    const input = foundedCart.map((el) => ({
      order_id: response.order_id,
      product_id: el.product.product_id,
      amount: el.amount,
      cost: el.product.cost,
    }));

    const result = await orderService.createOrderItem(input);

    const cartId = foundedCart.map(async (el) => await cartService.deleteCart(el.cart_id));

    res.status(200).json({ message: "create order done" });
  } catch (err) {
    next(err);
  } finally {
    console.log(req.file);
    if (req.file.fieldname === "evidence") {
      fs.unlink(req.file.path);
    }
  }
};
orderController.createOrderByCredit = async (req, res, next) => {
  try {
    const data = {
      user_id: req.user.user_id,
      totalCost: req.body.cost,
    };

    const response = await orderService.createOrderFromCart(data); //totalcost evidence === input

    const foundedCart = await cartService.findCartData(+data.user_id);

    const input = foundedCart.map((el) => ({
      order_id: response.order_id,
      product_id: el.product.product_id,
      amount: el.amount,
      cost: el.product.cost,
    }));

    const result = await orderService.createOrderItem(input);

    const cartId = foundedCart.map(async (el) => await cartService.deleteCart(el.cart_id));
    req.order = response;
    next();
  } catch (err) {
    next(err);
  }
};

orderController.getAllOrder = async (req, res, next) => {
  try {
    const order = await orderService.getOrder();
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

orderController.updateOrder = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    const { orderId } = req.params;
    const { status } = req.body;

    if (status !== "received" && isAdmin !== true) {
      createNewError({ message: "not Admin cannot do this", statusCode: 401 });
    }
    const result = await orderService.updateOrder(orderId, status);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

orderController.getOrderByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const result = await orderService.getOrderByUser(user_id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = orderController;
