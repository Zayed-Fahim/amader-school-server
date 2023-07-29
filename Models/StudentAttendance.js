const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const studentAttendanceSchema = mongoose.Schema(
  {
    classTeacher: {
      id: {
        type: ObjectId,
        required: true,
        ref: "Teacher",
      },
    },
    date: {
      type: String,
      required: true,
    },
    advisedStudentsAttendances: [
      {
        advisedStudent_Id: {
          type: String,
          required: true,
        },
        advisedStudentId: {
          type: String,
          required: true,
        },
        attendanceStatus: {
          type: Boolean,
          required: true,
        },
        advisedStudentName: {
          type: String,
          required: true,
        },
        advisedStudentClass: {
          type: String,
          required: true,
        },
        advisedStudentSection: {
          type: String,
          required: true,
        },
        advisedStudentShift: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const StudentAttendance = mongoose.model(
  "StudentAttendance",
  studentAttendanceSchema
);

module.exports = StudentAttendance;
