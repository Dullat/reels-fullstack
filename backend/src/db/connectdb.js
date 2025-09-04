const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/food-view");
  console.log("Mongo connected");
};

module.exports = connectDB;
