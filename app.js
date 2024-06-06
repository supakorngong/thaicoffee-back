const express = require("express");
const authRouter = require("./router/auth-route");
const { registerValidator } = require("./middleware/validator");
const errorMiddleware = require("./middleware/error");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use("/auth", authRouter);
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`listen to port ${port}`);
});
