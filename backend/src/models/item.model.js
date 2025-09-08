const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  video: {
    type: String,
    required: [true, "Please provide a video"],
  },
  thumbnail: {
    type: String,
    required: [true, "Please provide a thumbnail"],
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: [true, "Pleasse provide product id"],
  },
  videoFileId: {
    type: String,
  },
  thumbnailFileId: {
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
  // category: {
  //   type: String,
  //   enum: {
  //     values: [
  //       "North Indian",
  //       "South Indian",
  //       "Punjabi",
  //       "Gujarati",
  //       "Rajasthani",
  //       "Bengali",
  //       "Mughlai",
  //       "Hyderabadi",
  //       "Street Food",
  //       "Tandoori",
  //       "Biryani",
  //       "Snacks",
  //       "Breakfast",
  //       "Dessert",
  //       "Fast Food",
  //       "Chinese",
  //       "Continental",
  //       "Vegan",
  //       "Vegetarian",
  //       "Non-Vegetarian",
  //       "Seafood",
  //       "Healthy",
  //     ],
  //     message: "please provide a category",
  //   },
  // },
});

module.exports = mongoose.model("item", itemSchema);
