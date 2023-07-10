const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  examName: { type: String, required: true },
  examCode: { type: String, required: true },
  date: { type: Date, required: true },
  day: { type: String, required: true },
  classroom: { type: String, required: true },
  assignedClass: { type: String, required: true },
});

const ExamSchedule = mongoose.model("ExamSchedule", examSchema);
module.exports = ExamSchedule;
