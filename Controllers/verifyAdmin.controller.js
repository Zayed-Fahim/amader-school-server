const Admin = require("../Models/Admin");

exports.verifyAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.admin?.email });
    res.status(200).json({
      message: "Success",
      payload: { admin },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get the Admin.",
      error: error.message,
    });
  }
};
