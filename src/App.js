import React, { useState, useEffect } from "react";
import Home from "./Components/Home";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [student_schools, setStudentSchools] = useState([]);
  const [numberEnrolled, setNumberEnrolled] = useState([0]);

  useEffect(() => {
    axios
      .get("/api/students")
      .then(response => {
        console.log(response.data);
        setStudents(response.data);
      })
      .catch(ex => console.log(ex.response.data));
  }, []);
  useEffect(() => {
    axios
      .get("/api/schools")
      .then(response => {
        console.log(response.data);
        setSchools(response.data);
      })
      .catch(ex => console.log(ex.response.data));
  }, []);
  useEffect(() => {
    axios
      .get("/api/student_schools")
      .then(response => {
        console.log(response.data);
        setStudentSchools(response.data);
      })
      .catch(ex => console.log(ex.response.data));
  }, []);

  const getNumberEnrolled = () => {
    console.log("in getNumberEnrolled function");
    students.filter();
  };

  return (
    <div className="App">
      <div>
        <h1>Acme Schools</h1>
        <ul>
          <li>{schools.length} Schools</li>
          <li>
            {students.length} Students ({numberEnrolled} enrolled)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
