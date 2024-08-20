const prisma = require("../model/prisma");

const paymentService = {};

paymentService.webhook = (data, sessionId, id) => {
  const credit = prisma.payment.create({ data: { status: data.status, order_id: data.order, session_id: sessionId, transaction_id: id } });
  return credit;
};

module.exports = paymentService;
