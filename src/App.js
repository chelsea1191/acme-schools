import React, { useState, useEffect } from "react";
import CreateSchool from "./Components/CreateSchool";
import CreateStudent from "./Components/CreateStudent";
import Unenrolled from "./Components/Unenrolled";
import SchoolList from "./Components/SchoolList";
import qs from "qs";

import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [unenrolled, setUnenrolled] = useState([]);
  const [params, setParams] = useState(qs.parse(window.location.hash.slice(1)));
  const { view, id } = params;

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);

  useEffect(() => {
    Promise.all([axios.get("/api/schools"), axios.get("/api/students")])
      .then(responses => responses.map(response => response.data))
      .then(results => {
        console.log(results);
        setSchools(results[0]);
        setStudents(results[1]);
        setUnenrolled(results[1].filter(student => !student.schoolId));
      })
      .catch(ex => setError(ex.response.data.message));
  }, []);

  return (
    <div className="App">
      {!view && (
        <div>
          <div>
            <h1>Acme Schools</h1>
            <ul>
              <li>
                {schools.length} {schools.length === 1 ? "School" : "Schools"}
              </li>
              <li>
                {students.length}{" "}
                {students.length === 1 ? "Student" : "Students"} (
                {students.length - unenrolled.length}
                &nbsp; enrolled)
              </li>
            </ul>
          </div>
          <div id="createStudent">
            <CreateStudent
              students={students}
              setStudents={setStudents}
              schools={schools}
            />
          </div>
          <div id="createSchool">
            <CreateSchool schools={schools} setSchools={setSchools} />
          </div>
          <div id="unenrolled">
            <Unenrolled unenrolled={unenrolled} />
          </div>
          <div id="schoolList">
            <ul>
              {schools.map(school => {
                return (
                  <div key={school.id}>
                    <SchoolList
                      school={school}
                      students={students}
                      setStudents={setStudents}
                    />
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
