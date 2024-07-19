const express = require("express");
// const authRouter = require("");
const cors = require("cors");

// const { registerValidator } = require("./middleware/validator");

const errorMiddleware = require("./src/middleware/error");
// const productRouter = require("./router/product-route");
// const authenticate = require("./middleware/authenticate");

// const cartController = require("./controller/cartController");

// const cartRouter = require("./router/cart-route");
// const orderRouter = require("./router/order-route");
// const authenticateAdmin = require("./middleware/authenicateAdmin");
const authAdminRouter = require("./src/router/Authadmin-route");
const authRouter = require("./src/router/auth-route");
const productRouter = require("./src/router/product-route");
const cartRouter = require("./src/router/cart-route");
const orderRouter = require("./src/router/order-route");
const authenticate = require("./src/middleware/authenticate");
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
