const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const teacherAttendanceSchema = mongoose.Schema(
  {
    admin: {
      id: {
        type: ObjectId,
        required: true,
        ref: "Admin",
      },
    },
    date: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      required: true,
    },
    teachersAttendances: [
      {
        teacher_Id: {
          type: String,
          required: true,
        },
        teacherId: {
          type: String,
          required: true,
        },
        attendanceStatus: {
          type: Boolean,
          required: true,
        },
        teacherName: {
          type: String,
          required: true,
        },
        teacherShift: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const TeacherAttendance = mongoose.model(
  "TeacherAttendance",
  teacherAttendanceSchema
);

module.exports = TeacherAttendance;
