const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const loginAdminRoute = require("./Routes/adminLogin.route");
const loginTeacherRoute = require("./Routes/teacherLogin.route");
const loginStudentRoute = require("./Routes/studentLogin.route");
const adminRoute = require("./Routes/admin.route");
const teacherRoute = require("./Routes/teacher.route");
const studentRoute = require("./Routes/student.route");
const expenseRoute = require("./Routes/expense.route");
const classScheduleRoute = require("./Routes/classSchedule.route");
const subjectsRoute = require("./Routes/subjects.route");
const addRoutineRoute = require("./Routes/addRoutine.route");
const viewRoutineRoute = require("./Routes/viewRoutine.route");
const teacherAttendanceRoute = require("./Routes/teacherAttendance.route");
const examsScheduleRoute = require(".//Routes/examSchedule.route");

app.use("/api/v1/admin-login", loginAdminRoute);
app.use("/api/v1/teacher-login", loginTeacherRoute);
app.use("/api/v1/student-login", loginStudentRoute);
app.use("/api/v1/admins", adminRoute);
app.use("/api/v1/teachers", teacherRoute);
app.use("/api/v1/students", studentRoute);
app.use("/api/v1/expenses", expenseRoute);
app.use("/api/v1/class-schedules", classScheduleRoute);
app.use("/api/v1/add-subject&all-subjects", subjectsRoute);
app.use("/api/v1/add-routine", addRoutineRoute);
app.use("/api/v1/view-routine", viewRoutineRoute);
app.use("/api/v1/teacher-attendance", teacherAttendanceRoute);
app.use("/api/v1/exams-schedule", examsScheduleRoute);

app.get("/", (req, res) => {
  res.status(200).send("Amader school server is running!");
});

module.exports = app;
