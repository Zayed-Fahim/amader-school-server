const {
  getExpensesService,
  addExpenseService,
} = require("../Services/expense.service");

exports.addExpense = async (req, res, next) => {
  try {
    const result = await addExpenseService(req.body);
    res.status(200).json({
      status: "Success",
      message: "expense added successfully",
      payload: { result },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't add this expense.",
      error: error.message,
    });
  }
  next();
};

exports.getExpenses = async (req, res, next) => {
  try {
    const result = await getExpensesService();
    res.status(200).json({
      status: "Success",
      message: "Successfully get all expenses details",
      payload: { result },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get all expenses details.",
      error: error.message,
    });
  }
  next();
};
