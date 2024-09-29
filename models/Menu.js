const { Schema, model } = require("mongoose");

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
    required: true,
  },
  isDrink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  sales: {
    type: Number,
    default: 0,
  },
});

const Menu = model("Menu", menuSchema);

module.exports = Menu;
