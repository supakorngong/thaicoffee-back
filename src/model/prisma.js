const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
prisma.$use(async (params, next) => {
  const result = await next(params);

  if (params.model === "Order" && params.action === "findMany") {
    return result.map((order) => {
      if (typeof order.order_id === "number") {
        order.order_id = order.order_id.toString(); // แปลง `order_id` เป็น String
      }
      return order;
    });
  }

  return result;
});

module.exports = prisma;
