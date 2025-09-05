const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/auth.route.js");
const itemsRouter = require("./routes/items.route.js");
const errorHandlerMiddleware = require("./middleware/custom.error.middleware.js");
const cors = require("cors");

const app = express();

// middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/reels", itemsRouter);
app.get("/", (req, res) => {
  res.send("runing");
});

app.use(errorHandlerMiddleware);
module.exports = app;
