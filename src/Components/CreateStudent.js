import React, { useState } from "react";
import axios from "axios";

const CreateStudent = ({ students, setStudents, schools }) => {
  const [newStudentName, setNewStudentName] = useState([]);
  const [schoolSelection, setSchoolSelection] = useState(null);

  const onNameChange = ev => {
    setNewStudentName(ev.target.value);
  };
  const onSchoolChange = ev => {
    setSchoolSelection(ev.target.value);
  };

  const createStudent = ev => {
    ev.preventDefault();

    axios
      .post("/api/createStudent", { newStudentName, schoolSelection })
      .then(response => setStudents([...students, response.data]));
  };

  return (
    <div className="container">
      <h1>Create Student</h1>
      <form onSubmit={createStudent}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={newStudentName}
            onChange={onNameChange}
            placeholder="first name of student"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>{" "}
        <br />
        <div id="selection">
          <select onChange={onSchoolChange}>
            <option value="none">-- enroll in school --</option>
            {schools.map(school => {
              return (
                <option value={school.id} key={school.id}>
                  {school.name}
                </option>
              );
            })}
          </select>
        </div>
      </form>
    </div>
  );
};

export default CreateStudent;
