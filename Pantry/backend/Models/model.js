const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  expirationDate: {
    type: Date,
  },
  category: {
    type: String,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;