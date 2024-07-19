const prisma = require("../model/prisma");
const createNewError = require("../utils/createError");

const cartService = {};

// foundCart.cart_id, product_id, amount, user_id

cartService.insertToCart = async (input) => {
  try {
    const response = await prisma.cart.upsert({
      where: {
        cart_id: input.cartId,
      },
      update: {
        amount: input.amount,
      },
      create: {
        user_id: input.userId,
        product_id: input.productId,
        amount: input.amount,
      },
    });
    // console.log("this is response from cart service", response);
    return response;
  } catch (err) {
    createNewError({ message: err.message, statusCode: 500 });
  }
};

cartService.findCart = async (userId, productId) => {
  try {
    const result = await prisma.cart.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });
    return result;
  } catch (err) {
    createNewError({ message: err.message, statusCode: 500 });
  }
};

cartService.findCartData = async (userId) => {
  try {
    return await prisma.cart.findMany({
      where: {
        user_id: userId,
      },
      include: {
        product: true,
      },
    });
  } catch (err) {
    createNewError({ message: err.message, statusCode: 500 });
  }
};

cartService.deleteCart = async (cartId) => {
  try {
    return await prisma.cart.deleteMany({
      where: {
        cart_id: cartId,
      },
    });
  } catch (err) {
    createNewError({ message: err.message, statusCode: 500 });
  }
};

cartService.findProduct = async (productId) => {
  try {
    return await prisma.product.findFirst({
      where: {
        product_id: productId,
      },
    });
  } catch (err) {
    createNewError({ message: err.message, statusCode: 500 });
  }
};
module.exports = cartService;
