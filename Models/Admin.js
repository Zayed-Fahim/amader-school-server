const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const adminSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid phone number.",
      ],
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["Admin"],
        message: "Role can't be {VALUE}, must be admin.",
      },
    },
    password: {
      type: String,
      required: true,
    },
    schoolTag: {
      type: String,
      required: true,
      uppercase: true,
    },
    photo: {
      type: String,
      required: true,
    },

    teachers: [{ type: ObjectId, ref: "Teacher" }],

    students: [{ type: ObjectId, ref: "Student" }],

    classSchedules: [],
    subjects: [],

    dayShiftRoutine: [],
    morningShiftRoutine: [],

    teacherAttendance: [],

    dayShiftTransportSchedule: [],
    morningShiftTransportSchedule: [],

    examSchedule: [],
    examsGrade: [],
    notices: [],
    accountSetting: [],
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
