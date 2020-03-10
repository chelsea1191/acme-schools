const pg = require("pg");
const { Client } = pg;
const uuid = require("uuid/v4");
const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost/schools"
);
const faker = require("faker");

client.connect();

const sync = async () => {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS student_school;
  DROP TABLE IF EXISTS school;
  DROP TABLE IF EXISTS student;

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
    "isEnrolled" BOOLEAN default false,
    CHECK (char_length(name) > 0)
  );
  CREATE TABLE student_school
  (
    id SERIAL PRIMARY KEY,
    "studentId" SERIAL REFERENCES student(id),
    "schoolId" SERIAL REFERENCES school(id)
  );
  CREATE UNIQUE INDEX ON student_school("studentId", "schoolId");
  INSERT INTO student (name, "isEnrolled") VALUES ('Lucy', 'true');
  INSERT INTO student (name, "isEnrolled") VALUES ('Moe', 'true');
  INSERT INTO student (name) VALUES ('Sally');
  INSERT INTO student (name) VALUES ('Curly');
  INSERT INTO school (name) VALUES ('UF');
  INSERT INTO school (name) VALUES ('UNF');
  INSERT INTO school (name) VALUES ('FSU');
  INSERT INTO student_school ("studentId", "schoolId") VALUES ('1','1');
  INSERT INTO student_school ("studentId", "schoolId") VALUES ('2','2');
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
const readStudentSchools = async () => {
  const SQL = `SELECT * FROM student_school;`;
  const response = await client.query(SQL);
  return response.rows;
};

//////////////////post///////////////////
// const createUser = async ({ name }) => {
//   const SQL = `INSERT INTO users (name) VALUES ($1) returning *;`;
//   const response = await client.query(SQL, [name]);
//   return response.rows[0];
// };
//////////////////put///////////////////
// const updateUserThing = async ({ isFavorite, id }) => {
//   const SQL = `UPDATE user_things SET (isFavorite) = ($1) WHERE (id) = ($2) returning *`;
//   const response = await client.query(SQL, [isFavorite, id]);
//   return response.rows[0];
// };
//////////////////delete///////////////////
// const deleteUser = async id => {
//   const SQL = `DELETE FROM users WHERE (id) = ($1);`;
//   await client.query(SQL, [id]);
// };

module.exports = {
  sync,
  readSchools,
  readStudents,
  readStudentSchools
};
