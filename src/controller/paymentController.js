const paymentService = require("../service/paymentService");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.ENPOINT_SECRET;

const { v4: uuidv4 } = require("uuid");

const orderService = require("../service/orderService");
const { order } = require("../model/prisma");

const paymentController = {};
// stripe
paymentController.checkout = async (req, res, next) => {
  try {
    const products = req.body.input;

    const checkoutProduct = products.map((el) => ({
      price_data: {
        currency: "thb",
        product_data: {
          name: el.product.name,
        },
        unit_amount: el.product.cost * 100,
      },
      quantity: el.amount,
    }));

    const { order_id } = req.order;

    // Stripe Checkout Session โดยใช้ stripe.checkout.sessions.create()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: checkoutProduct, //line_items สำหรับ Stripe Checkout ฟอร์แมตข้อมูลให้ตรงกับที่ Stripe ต้องการ
      mode: "payment",
      metadata: {
        order: order_id, //เอาไว้ ติดตามสถานะการจ่ายเงิน จะได้เปลี่ยนเป็น payed ได้
        //ระบบ backend สามารถใช้ metadata.orderเพื่อรู้ว่าการชำระเงินนี้เป็นของคำสั่งซื้อใด และอัปเดตสถานะคำสั่งซื้อในฐานข้อมูลได้
      },
      // success_url: `http://localhost:8888/success.html`,
      success_url: `${process.env.BASE_URL}/success.html`,
      cancel_url: `${process.env.BASE_URL}/cancel.html`,
    });

    res.status(200).json({ url: session.url });
    // Frontend จะใช้ URL นี้เพื่อ redirect ผู้ใช้ไปยังหน้าชำระเงินของ Stripe
  } catch (err) {
    next(err);
  }
};

paymentController.webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    // req.body = ข้อมูลเกี่ยวกับการชำระเงิน
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    res.send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const paymentSuccessData = event.data.object;

      const orderId = paymentSuccessData.metadata.order;

      const sessionId = paymentSuccessData.id;

      const data = {
        status: paymentSuccessData.status,
        order: orderId,
      };

      const uuid = uuidv4();

      await paymentService.webhook(data, sessionId, uuid);

      await orderService.updateOrder(orderId, "payed");

      res.status(200).send("payment success");
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

module.exports = paymentController;
