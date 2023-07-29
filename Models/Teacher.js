const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const teacherSchema = mongoose.Schema(
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
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender can't be {VALUE}, must be male/female/other.",
      },
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["Teacher"],
        message: "Role can't be {VALUE}, must be teacher.",
      },
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
    },
    motherName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
      enum: {
        values: ["Islam", "Hindu", "Christian", "Buddha"],
        message:
          "Religion can't be {VALUE}, must be islam/hindu/christian/buddha.",
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
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
    password: {
      type: String,
      required: true,
    },
    schoolTag: {
      type: String,
      required: true,
    },
    classTeacher: {
      type: String,
      required: true,
      enum: {
        values: ["Yes", "No"],
        message: "Class Teacher can't be {VALUE}, must be Yes/No.",
      },
    },
    teacherOfClass: {
      type: String,
      required: true,
    },
    sectionOfClass: {
      type: String,
      required: true,
    },
    teacherOfGroup: {
      type: String,
    },
    subjectName: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: [true, "Please provide unique teacher id."],
    },
    photo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    shortBio: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      required: true,
      enum: {
        values: ["Morning", "Day"],
        message: "Shift can't be {VALUE}, must be Morning/Day",
      },
    },
    admin: {
      id: {
        type: ObjectId,
        required: true,
        ref: "Admin",
      },
    },
    advisedStudents: [
      {
        type: ObjectId,
        ref: "Student",
      },
    ],
    notices: [
      {
        type: ObjectId,
        ref: "Notice",
      },
    ],
    events: [],
    results: [],
    attendances: [
      {
        type: ObjectId,
        ref: "TeacherAttendance",
      },
    ],
    advisedStudentsAttendances: [
      {
        type: ObjectId,
        ref: "StudentAttendance",
      },
    ],
    classSchedules: [
      {
        type: ObjectId,
        ref: "ClassSchedule",
      },
    ],
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
