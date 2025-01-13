const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures the price is a positive value
  },
  taste: {
    type: String,
    enum: ["spicy", "sweet", "salty", "bitter", "sour"], // Example of possible tastes
    required: true,
  },
  is_drink: {
    type: Boolean,
    required: true,
  },
  ingredients: {
    type: [String], // Array of strings to list the ingredients
    required: true,
  },
  num_sales: {
    type: Number,
    default: 0, // Default value for number of sales
    min: 0, // Ensures the sales count is not negative
  },
});

const Menuitem = mongoose.model("MenuItem", menuItemSchema);
module.exports = Menuitem;
