const pg = require("pg");
const { Client } = pg;
const uuid = require("uuid/v4");
const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost/schools"
);

client.connect();

const sync = async () => {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS student;
  DROP TABLE IF EXISTS school;
  CREATE TABLE school
  (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    CHECK (char_length(name) > 0)
  );
  CREATE TABLE student
  (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    "schoolId" INT REFERENCES school(id) DEFAULT NULL,
    CHECK (char_length(name) > 0)
  );
  INSERT INTO school (name) VALUES ('UF');
  INSERT INTO school (name) VALUES ('UNF');
  INSERT INTO school (name) VALUES ('FSU');
  INSERT INTO student (name, "schoolId") VALUES ('Lucy', '1');
  INSERT INTO student (name) VALUES ('Moe');
  INSERT INTO student (name) VALUES ('Sally');
  INSERT INTO student (name) VALUES ('Curly');
  `;
  await client.query(SQL);
};
////////////////get///////////////////
const readSchools = async () => {
  const SQL = `SELECT * FROM school;`;
  const response = await client.query(SQL);
  return response.rows;
};
const readStudents = async () => {
  const SQL = `SELECT * FROM student;`;
  const response = await client.query(SQL);
  return response.rows;
};
const readStudentsBySchool = async id => {
  const SQL = `SELECT * FROM student WHERE "schoolId" = $1;`;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

////////////////post///////////////////
const createStudent = async (name, schoolId) => {
  const SQL = `INSERT INTO student (name, "schoolId") VALUES ($1, $2) returning *;`;
  const response = await client.query(SQL, [name, schoolId]);
  return response.rows[0];
};
const createSchool = async name => {
  const SQL = `INSERT INTO school (name) VALUES ($1) returning *`;
  const response = await client.query(SQL, [name]);
  return response.rows[0];
};
//////////////////put///////////////////
const updateStudent = async input => {
  console.log("back end: ", input);
  const SQL = `UPDATE student SET "schoolId" = ($2) WHERE (id) = ($1) returning *`;
  const response = await client.query(SQL, [
    input.studentSelection,
    input.schoolId
  ]);
  return response.rows[0];
};
//////////////////delete///////////////////
const deleteStudent = async id => {
  const SQL = `DELETE FROM student WHERE (id) = ($1);`;
  await client.query(SQL, [id]);
};
const deleteSchool = async id => {
  const SQL = `DELETE FROM school WHERE (id) = ($1);`;
  await client.query(SQL, [id]);
};

module.exports = {
  sync,
  readSchools,
  readStudents,
  readStudentsBySchool,
  createStudent,
  createSchool,
  deleteStudent,
  deleteSchool,
  updateStudent
};
