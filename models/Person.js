const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
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

personSchema.pre("save", async function (next) {
  const person = this;

  if (!person.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    console.log("salt", salt);
    const personPassword = await bcrypt.hash(person.password, salt);
    console.log("hash", personPassword);
    person.password = personPassword;
    next();
  } catch (error) {
    next(error);
  }
});

personSchema.methods.comparePassword = async function (personPassword) {
  console.log("comparePassword", personPassword, this.password);

  try {
    const passwordMatched = await bcrypt.compare(personPassword, this.password);
    console.log("passwordMatched", passwordMatched);
    return passwordMatched;
  } catch (error) {
    return error;
  }
};

const Person = model("Person", personSchema);

module.exports = Person;
