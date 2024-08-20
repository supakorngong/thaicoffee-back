const paymentService = require("../service/paymentService");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.ENPOINT_SECRET;

const { v4: uuidv4 } = require("uuid");

const orderService = require("../service/orderService");

const paymentController = {};

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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: checkoutProduct,
      mode: "payment",
      metadata: {
        order: order_id,
      },
      success_url: `http://localhost:8888/success.html`,
      cancel_url: `http://localhost:8888/cancel.html`,
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    next(err);
  }
};

paymentController.webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
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
      const result = await paymentService.webhook(data, sessionId, uuid);
      const statusOf = await orderService.updateOrder(orderId, "payed");

      console.log("=== update result", result, statusOf);
      res.status(200).send("payment success");
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

module.exports = paymentController;
