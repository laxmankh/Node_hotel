const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    enum: ["chef", "owner", "manager", "waiter"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Regex to validate mobile number (10 digits)
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Regex to validate email format
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0, // Ensures salary is a positive number
  },
});
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
