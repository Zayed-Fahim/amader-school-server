const { getRoutinesService } = require("../Services/viewRoutine.service");

exports.getRoutine = async (req, res, next) => {
  try {
    const result = await getRoutinesService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Routine Found",
      payload: { result },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't Found the Routine.",
      error: error.message,
    });
  }
  next();
};
