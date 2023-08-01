const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const studentSchema = mongoose.Schema(
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
        message: "Gender can't be {VALUE}, must be Male/Female/Other.",
      },
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["Student"],
        message: "Role can't be {VALUE}, must be Student.",
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
          "Religion can't be {VALUE}, must be Islam/Hindu/Christian/Buddha.",
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
    assignedClass: {
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
    group: {
      type: String,
      required: true,
      enum: {
        values: ["Science", "Arts", "Commerce"],
        message: "Group can't be {VALUE}, must be Science/Arts/Commerce.",
      },
    },
    section: {
      type: String,
      required: true,
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
    id: {
      type: String,
      required: true,
      unique: [true, "Please provide unique student id."],
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
    classTeacher: {
      id: {
        type: ObjectId,
        required: true,
        ref: "Teacher",
      },
    },
    schoolAuthority: {
      id: {
        type: ObjectId,
        required: true,
        ref: "Admin",
      },
    },
    notices: [
      {
        type: ObjectId,
        ref: "Notice",
      },
    ],
    results: [
      {
        type: ObjectId,
        ref: "Result",
      },
    ],
    events: [
      {
        type: ObjectId,
        ref: "Event",
      },
    ],
    routines: [],
    attendances: [],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
