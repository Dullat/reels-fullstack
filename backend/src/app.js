const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/auth.route.js");
const errorHandlerMiddleware = require("./middleware/custom.error.middleware.js");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use("/", userRouter);
app.get("/", (req, res) => {
  res.send("runing");
});

app.use(errorHandlerMiddleware);
module.exports = app;
