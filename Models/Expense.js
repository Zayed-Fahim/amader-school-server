const mongoose = require("mongoose");
const validator = require("validator");

const expenseSchema = mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminID: {
    type: String,
    required: true,
  },
  expenseType: {
    type: String,
    required: true,
    enum: {
      values: ["Salary", "Transport", "Maintenance", "Purchase", "Utilities"],
      message:
        "Expense Type can't be {VALUE}, must be Salary/Transport/Maintenance/Purchase/Utilities.",
    },
  },
  expenseAmount: {
    type: Number,
    required: true,
    min: [1, "Amount can't be negative."],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        if (isInteger) {
          return true;
        } else {
          return false;
        }
      },
    },
    message: "Amount must be an Integer.",
  },
  adminEmail: {
    type: String,
    required: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  adminPhoneNumber: {
    type: String,
    required: true,
    validate: [validator.isMobilePhone, "Please provide a valid phone number."],
  },
  expenseStatus: {
    type: String,
    required: true,
    enum: {
      values: ["Paid", "Unpaid", "Pending"],
      message: "Expense Type can't be {VALUE}, must be Paid/Unpaid/Pending.",
    },
  },
  issueDate: {
    type: String,
    required: true,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
