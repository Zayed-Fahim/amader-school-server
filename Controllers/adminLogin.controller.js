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
    const admin = await Admin.findOne({ email: email })
      .populate([{ path: "teachers", strictPopulate: false }])
      .populate([{ path: "students", strictPopulate: false }])
      .populate([{ path: "classSchedules", strictPopulate: false }])
      .populate([{ path: "subjects", strictPopulate: false }]);
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
};

exports.verifyAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.admin?.email })
      .populate([{ path: "teachers", strictPopulate: false }])
      .populate([{ path: "students", strictPopulate: false }])
      .populate([{ path: "classSchedules", strictPopulate: false }])
      .populate([{ path: "subjects", strictPopulate: false }])
      .populate([{ path: "dayShiftRoutines", strictPopulate: false }])
      .populate([{ path: "morningShiftRoutines", strictPopulate: false }])
      .populate([{ path: "dayShiftTransportSchedules", strictPopulate: false }])
      .populate([
        { path: "morningShiftTransportSchedules", strictPopulate: false },
      ])
      .populate([{ path: "examsGrades", strictPopulate: false }])
      .populate([{ path: "accountSettings", strictPopulate: false }])
      .populate([{ path: "examSchedules", strictPopulate: false }]);

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
