const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./src/middleware/error");
const authAdminRouter = require("./src/router/Authadmin-route");
const authRouter = require("./src/router/auth-route");
const productRouter = require("./src/router/product-route");
const cartRouter = require("./src/router/cart-route");
const orderRouter = require("./src/router/order-route");
const authenticate = require("./src/middleware/authenticate");
const paymentRouter = require("./src/router/payment-route");
const paymentController = require("./src/controller/paymentController");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.static("public"));
app.post("/webhook", express.raw({ type: "application/json" }), paymentController.webhook);
app.use(express.json());
app.use("/payment", paymentRouter);

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", authenticate, cartRouter);
app.use("/order", authenticate, orderRouter);
app.use("/admin", authAdminRouter);

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`listen to port ${port}`);
});
