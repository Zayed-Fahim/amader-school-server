const Admin = require("../Models/Admin");
const {
  getAdminsService,
  createAdminService,
  viewAttendancesDataFilterByDateAndShiftService,
} = require("../Services/admin.service");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createAdmin = async (req, res, next) => {
  try {
    const {
      id,
      email,
      role,
      password,
      userName,
      photo,
      fullName,
      schoolTag,
      phoneNumber,
    } = req.body;

    const adminExists = await Admin.exists({
      $and: [{ email: email }, { id: id }],
    });

    if (adminExists) {
      return res.status(409).json({
        message: "Admin with this email or id already exist.",
      });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const admin = {
        fullName: fullName,
        userName: userName,
        id: id,
        email: email,
        role: role,
        password: hash,
        phoneNumber: phoneNumber,
        schoolTag: schoolTag,
        photo: photo,
      };
      const result = await createAdminService(admin);
      res.status(200).json({
        status: "Success",
        message: "Admin added successfully",
        payload: { result },
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't add this admin.",
      error: error.message,
    });
  }
};

exports.getAdmins = async (req, res, next) => {
  try {
    const result = await getAdminsService();
    res.status(200).json({
      status: "Success",
      message: "Successfully get all admins details",
      payload: { result },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get all admins details.",
      error: error.message,
    });
  }
};

// exports.getAdminById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const admin = Admin.findOne({ _id: id })
//       .populate([{ path: "teachers", strictPopulate: false }])
//       .populate([{ path: "students", strictPopulate: false }])
//       .populate([{ path: "classSchedules", strictPopulate: false }])
//       .populate([{ path: "subjects", strictPopulate: false }]);
//     res.status(200).json({
//       status: "Success",
//       message: "Admin Found",
//       payload: { admin },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "Failed",
//       message: "Admin not Found.",
//       error: error.message,
//     });
//   }
// };

exports.viewAttendancesDataFilterByDateAndShift = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { shift, date } = req.query;
    const attendanceData = await viewAttendancesDataFilterByDateAndShiftService(
      adminId,
      shift,
      date
    );
    console.log(attendanceData);
    res.status(200).json({ status: "Success", payload: { attendanceData } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Data." });
  }
};
