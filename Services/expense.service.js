const Expense = require("../Models/Expense");

exports.addExpenseService = async (data) => {
  const result = await Expense.create(data);
  return result;
};

exports.getExpensesService = async () => {
  const result = await Expense.find({}).sort({issueDate:-1});
  return result;
};
