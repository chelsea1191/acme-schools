import React, { useState, useEffect } from "react";

import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [unenrolled, setUnenrolled] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("/api/schools"),
      axios.get("/api/students"),
      axios.get("/api/unenrolledStudents")
    ])
      .then(responses => responses.map(response => response.data))
      .then(results => {
        console.log(results);
        setSchools(results[0]);
        setStudents(results[1]);
        setUnenrolled(results[2]);
      })
      .catch(ex => setError(ex.response.data.message));
  }, []);

  return (
    <div className="App">
      <div id="header">
        <h1>Acme Schools</h1>
        <ul>
          <li>{schools.length} Schools</li>
          <li>
            {students.length} Students ({students.length - unenrolled.length}{" "}
            enrolled)
          </li>
        </ul>
      </div>
      <div id="createStudent">
        <CreateStudent />
      </div>
      <div id="createSchool">
        <CreateSchool />
      </div>
    </div>
  );
};

export default App;
