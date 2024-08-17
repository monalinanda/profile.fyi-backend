const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  category: String,
  name: String,
  imgSrc: String,
  description: String,
  price: String,
});

const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
