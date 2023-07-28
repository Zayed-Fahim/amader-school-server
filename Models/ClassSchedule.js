const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const classScheduleSchema = mongoose.Schema({
  teacherName: {
    type: String,
    required: true,
    trim: true,
  },
  teacherID: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  teacherPhoneNumber: {
    type: String,
    required: true,
    validate: [validator.isMobilePhone, "Please provide a valid phone number."],
  },
  teacherEmail: {
    type: String,
    required: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  teachingShift: {
    type: String,
    required: true,
    enum: {
      values: ["Morning", "Day"],
      message: "Shift can't be {VALUE}, must be Morning/Day.",
    },
  },
  teachingClass: {
    type: String,
    required: true,
  },
  teachingGroup: {
    type: String,
    enum: {
      values: ["Science", "Arts", "Commerce"],
      message: "Group can't be {VALUE}, must be Science/Arts/Commerce.",
    },
  },
  teachingSection: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  dateOfClass: {
    type: String,
    required: true,
  },
  classTime: {
    type: String,
    required: true,
  },
  admin: {
    id: {
      type: ObjectId,
      required: true,
    },
    schoolTag: {
      type: String,
      required: true,
    },
  },
});

const ClassSchedule = mongoose.model("ClassSchedule", classScheduleSchema);
module.exports = ClassSchedule;
