const prisma = require("../model/prisma");
const createNewError = require("../utils/createError");

const orderService = {};

orderService.createOrderFromCart = async (input) => {
  try {
    return await prisma.order.create({
      data: {
        user_id: +input.user_id,
        total_cost: input.totalCost,
        evidence: input.evidence,
        // status: input.status,
      },
    });
  } catch (err) {
    createNewError({ message: err.message, statusCode: 500 });
  }
};
// [{ order_id: orderId, product_id: productId, amount, cost }]
orderService.createOrderItem = (input) => {
  return prisma.orderItem.createMany({
    data: input,
  });
};
orderService.deleteCart = (cartId) => {
  prisma.cart.deleteMany({
    where: {
      cart_id: {
        contains: cartId,
      },
    },
  });
};

orderService.getOrder = () => {
  return prisma.order.findMany({});
};

orderService.getOrderByUser = (userId) => {
  console.log("i am hereeeeeerrere", userId);
  return prisma.order.findMany({
    where: {
      user_id: userId,
    },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
  });
};

orderService.updateOrder = (orderId, status) => {
  return prisma.order.update({
    where: {
      order_id: +orderId,
    },
    data: {
      status: status,
    },
  });
};

module.exports = orderService;
