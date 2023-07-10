const ExamSchedule = require("../Models/ExamSchedule");

// Controller actions
(exports.createExamSchedule = async (req, res) => {
  try {
    const { examName, examCode, date, day, classroom, assignedClass } =
      req.body;
    const alreadyAssigned = ExamSchedule.includes({
      $and: [
        { examName: examName },
        { examCode: examCode },
        { date: date },
        { day: day },
        { classroom: classroom },
        { assignedClass: assignedClass },
      ],
    });
    if (alreadyAssigned) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Already Assigned" });
    }
    const exam = await ExamSchedule.create(req.body);
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}),
  (exports.getExamsSchedule = async (req, res) => {
    try {
      const exams = await ExamSchedule.find();
      res.json(exams);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
