import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateStudent = ({ student, setStudents, schools }) => {
  const [newName, setNewName] = useState([]);
  const [schoolId, setSchoolId] = useState("");
  const [studentId, setStudentId] = useState([]);

  useEffect(() => {
    if (student) {
      setNewName(student.name);
      setStudentId(student.id);
      setSchoolId(student.schoolId);
    }
  }, [student]);

  const submitUpdate = (newName, schoolId, studentId) => {
    axios
      .put(`/api/students/${studentId}`, {
        studentName: newName,
        schoolId: schoolId,
        studentId: studentId
      })
      .then(
        axios.get("/api/students").then(response => setStudents(response.data))
      )
      .then(() => {
        setNewName("");
        setSchoolId("");
        window.location.hash = "#";
      });
  };

  const deleteStudent = async id => {
    await axios
      .delete(`/api/deleteStudent/${id}`)
      .then(
        axios.get("/api/students").then(response => setStudents(response.data))
      );
  };

  const handleSelect = ev => {
    setSchoolId(ev.target.value);
  };

  const handleInput = ev => {
    setNewName(ev.target.value);
  };

  const handleDelete = ev => {
    deleteStudent(student.id);
    window.location.hash = "#";
  };

  return (
    <div>
      <form onSubmit={() => submitUpdate(newName, schoolId, studentId)}>
        <h2>Edit Student</h2>
        <input value={newName} onChange={handleInput} />
        <select value={schoolId || ""} onChange={handleSelect}>
          <option value="">-- Select School --</option>
          {schools.map(school => {
            return (
              <option value={school.id} key={school.id}>
                {school.name}
              </option>
            );
          })}
        </select>
        <button>Update</button>
      </form>
      <button onClick={handleDelete}>Delete Student</button>
    </div>
  );
};
export default UpdateStudent;
