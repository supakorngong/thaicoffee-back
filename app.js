const express = require("express");
const authRouter = require("./router/auth-route");
const cors = require("cors");

// const { registerValidator } = require("./middleware/validator");

const errorMiddleware = require("./middleware/error");
const productRouter = require("./router/product-route");
const authenticate = require("./middleware/authenticate");

// const cartController = require("./controller/cartController");

const cartRouter = require("./router/cart-route");
const orderRouter = require("./router/order-route");
// const authenticateAdmin = require("./middleware/authenicateAdmin");
const authAdminRouter = require("./router/Authadmin-route");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", authenticate, cartRouter);
app.use("/order", authenticate, orderRouter);
app.use("/admin", authAdminRouter);

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`listen to port ${port}`);
});
