const { Schema, model } = require("mongoose");

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  work: {
    type: String,
    required: true,
    enum: ["Manager", "Chef", "Waiter"],
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
  },
});

const Person = model("Person", personSchema);

module.exports = Person;
