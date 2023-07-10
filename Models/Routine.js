const mongoose = require("mongoose");

const routineSchema = mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: {
      values: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      message:
        "Day can't be {VALUE}, must be Sunday/Monday/Tuesday/Wednesday/Thursday.",
    },
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
  shift: {
    type: String,
    required: true,
    enum: {
      values: ["Day", "Morning"],
      message: "Shift can't be {VALUE}, must be Day/Morning.",
    },
  },
  subject: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    enum: {
      values: ["Science", "Arts", "Commerce"],
      message: "Group can't be {VALUE}, must be Science/Arts/Commerce.",
    },
  },
  teacherName: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: Array,
    required: true,
  },
});

const Routine = mongoose.model("Routine", routineSchema);
module.exports = Routine;
