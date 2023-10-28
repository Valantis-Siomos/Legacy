const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,

  expirationDate: Date,

  category: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
