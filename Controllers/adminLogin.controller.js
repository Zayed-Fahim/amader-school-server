const bcrypt = require("bcrypt");
const Admin = require("../Models/Admin");
const createJSONWebToken = require("../Hook/jsonwebtoken");

exports.loginAdminByEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("admin login", email, password);
    const admin = await Admin.findOne({ email }).populate([
      {
        path: "teachers students classSchedules subjects",
        strictPopulate: false,
      },
    ]);

    if (!admin) {
      return res.status(409).json({
        message: "No Admin found for this email. Please Sign up.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const adminInfo = {
      role: admin.role,
      email: admin.email,
    };

    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const token = createJSONWebToken(adminInfo, secretKey, "7days");

    return res.status(200).json({ payload: { admin, token } });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get the Admin.",
      error: error.message,
    });
  }
};

exports.verifyAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.admin.email }).populate([
      {
        path: "teachers students classSchedules subjects dayShiftRoutines morningShiftRoutines dayShiftTransportSchedules morningShiftTransportSchedules examsGrades accountSettings examSchedules",
        strictPopulate: false,
      },
    ]);

    console.log("from admin controller", admin);
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
