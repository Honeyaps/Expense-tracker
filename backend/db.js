const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Expense").then(() => {
  console.log("mongodb connected");
});

const userSchema = new mongoose.Schema({
  username: String,
  phoneno: String,
  email: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

const expenseSchema = new mongoose.Schema({
  userId: String,
  date: String,
  title: String,
  money: Number,
});

const Expense = mongoose.model("expense", expenseSchema);

module.exports = { User, Expense };
