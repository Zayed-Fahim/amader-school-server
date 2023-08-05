const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const routineSchema = mongoose.Schema(
  {
    admin: {
      id: {
        type: ObjectId,
        required: true,
      },
    },
    assignedClass: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      required: true,
    },
    group: {
      type: String,
    },
    routineVersion: {
      type: String,
      required: true,
    },
    routine: [
      {
        day: { type: String, required: true },
        period: { type: String, required: true },
        subjectName: { type: String, required: true },
        teacherName: { type: String, required: true },
        subjectType: { type: String, required: true },
        roomNo: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Routine = mongoose.model("Routine", routineSchema);
module.exports = Routine;
