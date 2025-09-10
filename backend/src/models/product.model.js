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
      values: ["food", "electronics", "furniture", "drinks"],
      message: "please provide a category",
    },
  },
});

module.exports = mongoose.model("product", productSchema);
