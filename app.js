const express = require("express");
const authRouter = require("./router/auth-route");
const { registerValidator } = require("./middleware/validator");
const errorMiddleware = require("./middleware/error");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use("/auth", registerValidator, authRouter);
app.use(errorMiddleware);
app.listen(8888, () => {
  console.log("listen to port 8888");
});
