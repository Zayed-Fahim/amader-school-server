const Subject = require("../Models/Subject");
const {
  addSubjectService,
  getSubjectsService,
} = require("../Services/subjects.service");

exports.addSubject = async (req, res, next) => {
  try {
    const {
      subjectCode,
      subjectName,
      subjectType,
      assignedGroup,
      assignedClass,
    } = req.body;
    const subjectExists = await Subject.exists({
      $and: [
        { subjectCode: subjectCode },
        { assignedClass: assignedClass },
        { subjectName: subjectName },
        { subjectType: subjectType },
        { assignedGroup: assignedGroup },
      ],
    });
    if (subjectExists) {
      return res.status(409).json({
        message: "This Subject already exist.",
      });
    }
    const result = await addSubjectService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Subject added successfully",
      payload: { result },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't add this Subject.",
      error: error.message,
    });
  }
  next();
};

exports.getSubjects = async (req, res, next) => {
  try {
    const result = await getSubjectsService();
    res.status(200).json({
      status: "Success",
      message: "Successfully get all Subjects.",
      payload: { result },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get all Subject.",
      error: error.message,
    });
  }
  next();
};
