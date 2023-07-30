const { addResultService } = require("../Services/result.service");

exports.addResult = async (req, res) => {
  try {
    const result = await addResultService(req.body);
    res.status(200).json({ status: "Success", message: "Result Added!!" });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't add this result!!.",
      error: error.message,
    });
  }
};
