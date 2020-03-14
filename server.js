const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");
const db = require("./db");
const bodyParser = require("body-parser");

//////////////////use///////////////////
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(bodyParser.json());
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/dist", express.static(path.join(__dirname, "dist")));

//////////////////get////////////////////
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.get("/api/schools", async (req, res, next) => {
  await db
    .readSchools()
    .then(schools => res.send(schools))
    .catch(next);
});
app.get("/api/students", async (req, res, next) => {
  await db
    .readStudents()
    .then(students => res.send(students))
    .catch(next);
});

////////////////post////////////////////
app.post("/api/createStudent", (req, res, next) => {
  db.createStudent(req.body.newStudentName, req.body.schoolSelection)
    .then(student => res.send(student))
    .catch(next);
});
app.post("/api/createSchool", (req, res, next) => {
  db.createSchool(req.body.newSchool)
    .then(school => res.send(school))
    .catch(next);
});
///////////////////put////////////////////
app.put("/api/students/:id", (req, res, next) => {
  db.updateStudent(req.body.studentName, req.body.schoolId, req.body.studentId)
    .then(student => res.send(student))
    .catch(next);
});
app.put("/api/schools/:id", (req, res, next) => {
  db.updateSchool(req.body.newName, req.body.schoolId)
    .then(school => res.send(school))
    .catch(next);
});

//////////////////delete////////////////////
app.delete("/api/deleteStudent/:id", (req, res, next) => {
  db.deleteStudent(req.params.id)
    .then(() => res.sendStatus(204)) //since no return
    .catch(next);
});
app.delete("/api/deleteSchool/:id", (req, res, next) => {
  db.deleteSchool(req.params.id)
    .then(() => res.sendStatus(204)) //since no return
    .catch(next);
});

const port = process.env.PORT || 3000;
db.sync()
  .then(() => {
    console.log("db synced");
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch(ex => console.log(ex));
