const express = require("express");
const router = express.Router();

const expenseController = require("../Controllers/expense.controller");

router
  .route("/")
  .post(expenseController.addExpense)
  .get(expenseController.getExpenses);

module.exports = router;
