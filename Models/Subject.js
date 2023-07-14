const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const subjectSchema = mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },
    subjectCode: {
      type: String,
      required: true,
    },
    subjectType: {
      type: String,
      required: true,
      enum: {
        values: ["Theory", "Practical"],
        message: "Subject Type can't be {VALUE},must be Theory/Practical.",
      },
    },
    assignedClass: {
      type: String,
      required: true,
    },
    assignedGroup: {
      type: String,
      enum: {
        values: ["Science", "Arts", "Commerce"],
        message:
          "Assigned Group can't be {VALUE}, must be Science/Arts/Commerce.",
      },
    },
    admin: {
      id: {
        type: ObjectId,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
