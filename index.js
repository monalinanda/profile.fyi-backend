const express = require("express");
const connectDB = require("./db/connectDB");
const ProductModel = require("./models/products.js");
const CartModel = require("./models/cart.js");
const cors = require("cors");
require("dotenv").config();

// Initialize Express app
const app = express();
app.use(express.json());

app.use(cors());
connectDB();

//Fetch products
app.get("/products", async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
});

//Fetch Cart items
app.get("/cart", async (req, res) => {
  const cart = await CartModel.find();
  res.json(cart);
});


app.post("/products", async (req, res) => {
  const product = new ProductModel(req.body);
  await product.save();
  res.status(201).json(product);
});

//cart array update with POST
app.post("/cart", async (req, res) => {
  const cartItem = new CartModel(req.body);
  await cartItem.save();
  res.status(201).json(cartItem);
});

//Update Cart items Quantity
app.put("/cart/:id", async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const updatedData = req.body;

    // Find the cart item by ID and update it
    const updatedCartItem = await CartModel.findOneAndUpdate(
      { id: cartItemId }, // Filter by the id
      updatedData, // Data to update
      { new: true } // Return the updated document
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json(updatedCartItem);
    console.log(updatedCartItem, "updatedData");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//FOR Delete Cart Item
app.delete("/cart/:id", async (req, res) => {
  try {
    const cartItemId = req.params.id;

    // Find the cart item by ID and delete it
    const deletedCartItem = await CartModel.findOneAndDelete({
      id: cartItemId,
    });

    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
