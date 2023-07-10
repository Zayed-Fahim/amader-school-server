const createJSONWebToken = require("../Hook/jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../Models/Admin");

exports.loginAdminByEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("admin login", email, password);
    const adminExists = await Admin.exists({ email: email });
    if (!adminExists) {
      return res.status(409).json({
        message: "No Admin found for this id.Please Sign up.",
      });
    }
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      return bcrypt.compare(password, admin.password, (err, result) => {
        if (result === true) {
          const adminInfo = {
            role: admin.role,
            email: admin.email,
          };
          const secretKey = process.env.ACCESS_TOKEN_SECRET;

          const token = createJSONWebToken(adminInfo, secretKey, "7days");
          return res
            .status(200)
            .json({ payload: { admin, token: `${token}` } });
        } else if (err) {
          return res.status(403).json({
            message: "Unauthorized",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get the Admin.",
      error: error.message,
    });
  }
  next();
};

exports.verifyAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.admin?.email })
      .populate("students")
      .populate("teachers");
    console.log("from admin controller",admin);
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
