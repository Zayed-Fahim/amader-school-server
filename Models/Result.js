const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
// const validator = require("validator");

const resultSchema = mongoose.Schema(
  {
    classTeacher: {
      id: {
        type: ObjectId,
        ref: "Teacher",
      },
    },
    admin: {
      id: {
        type: ObjectId,
        required: true,
        ref: "Admin",
      },
    },
    studentId: {
      type: String,
      uppercase: true,
      unique: true,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    examType: {
      type: String,
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    subjectCode: {
      type: String,
      required: true,
    },
    studentShift: {
      type: String,
      required: true,
      enum: {
        values: ["Morning", "Day"],
        message: "Shift can't be {VALUE}, must be Morning/Day",
      },
    },
    rollNumber: {
      type: Number,
      required: true,
      min: [1, "Roll can't be negative."],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Roll must be an Integer.",
    },
    studentClass: {
      type: String,
      required: true,
      enum: {
        values: [
          "Play",
          "KG",
          "One",
          "Two",
          "Three",
          "Four",
          "Five",
          "Six",
          "Seven",
          "Eight",
          "Nine",
          "Ten",
          "Eleven",
          "Twelve",
        ],
        message:
          "Class can't be {VALUE}, must be Play/KG/One/Two/Three/Four/Five/Six/Seven/Eight/Nine/Ten/Eleven/Twelve.",
      },
    },
    section: {
      type: String,
      required: true,
      uppercase: true,
    },
    group: {
      type: String,
      required: true,
      enum: {
        values: ["Science", "Arts", "Commerce"],
        message: "Group can't be {VALUE}, must be Science/Arts/Commerce.",
      },
    },
    marks: {
      type: Number,
      required: true,
      min: [0, "Marks can't be negative."],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Marks must be an Integer.",
    },
    letterGrade: {
      type: String,
      required: true,
      uppercase: true,
    },
    gradePoint: {
      type: String,
      required: true,
    },
    issueDate: {
      type: String,
      required: true,
    },
    issuedBy: {
      type: String,
      required: true,
    },
    examinedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
