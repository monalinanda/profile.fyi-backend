const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: String,
  category: String,
  name: String,
  imgSrc: String,
  description: String,
  price: String,
  quantity: Number,
});

const CartModel = mongoose.model("Cart", cartSchema);
module.exports = CartModel;
