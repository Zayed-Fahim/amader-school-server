const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const teacherAttendanceSchema = mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    shift: {
      type: String,
      required: true,
    },
    teacherAttendance: {
      type: String,
    },
  },
  { timestamps: true }
);

const TeacherAttendance = mongoose.model(
  "TeacherAttendance",
  teacherAttendanceSchema
);
module.exports = TeacherAttendance;
