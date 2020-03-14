import React, { useState, useEffect } from "react";
import axios from "axios";

const SchoolList = ({ school, students, setStudents }) => {
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const filtered = students.filter(student => {
      return student.schoolId == school.id;
    });
    setFilteredStudents(filtered);
  }, [students]);

  const updateStudent = (name, schoolId, studentId) => {
    console.log("front end: ", { name, schoolId, studentId });
    axios
      .put(`/api/students/${studentId}`, {
        studentName: name,
        schoolId: schoolId,
        studentId: studentId
      })
      .then(
        axios.get("/api/students").then(response => setStudents(response.data))
      );
  };

  const handleSelect = ev => {
    const studentId = ev.target.value;
    const filtered = students.find(student => {
      return student.id == studentId;
    });
    updateStudent(filtered.name, school.id, filtered.id);
  };

  const handleDelete = ev => {
    const filtered = students.find(student => {
      return student.id == ev.target.value;
    });
    updateStudent(filtered.name, null, filtered.id);
  };

  return (
    <div className="container">
      <a href={`#view=school&id=${school.id}`}>
        <h3>{school.name}</h3>
      </a>
      <select data-id={school.id} onChange={handleSelect}>
        <option value="none">-- enroll student --</option>
        {students
          .filter(student => student.schoolId !== school.id)
          .map(student => {
            return (
              <option id={school.id} value={student.id} key={student.id}>
                {student.name}
              </option>
            );
          })}
      </select>

      <ul>
        {filteredStudents.map(student => {
          return (
            <li key={student.id}>
              {student.name}{" "}
              <button value={student.id} onClick={handleDelete}>
                Unenroll
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SchoolList;
