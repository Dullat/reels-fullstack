const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide a imageUrl"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  fileId: {
    type: String,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Partner",
    required: [true, "Pleasse provide partner id"],
  },
  category: {
    type: String,
    enum: {
      values: [
        "North Indian",
        "South Indian",
        "Punjabi",
        "Gujarati",
        "Rajasthani",
        "Bengali",
        "Mughlai",
        "Hyderabadi",
        "Street Food",
        "Tandoori",
        "Biryani",
        "Snacks",
        "Breakfast",
        "Dessert",
        "Fast Food",
        "Chinese",
        "Continental",
        "Vegan",
        "Vegetarian",
        "Non-Vegetarian",
        "Seafood",
        "Healthy",
      ],
      message: "please provide a category",
    },
  },
});

module.exports = mongoose.model("product", productSchema);
