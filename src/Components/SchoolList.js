import React, { useState, useEffect } from "react";
import axios from "axios";

const SchoolList = ({ school, students, setStudents }) => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [studentSelection, setStudentSelection] = useState(""); //error with initialized state???
  const schoolId = school.id;

  useEffect(() => {
    const filtered = students.filter(student => {
      return student.schoolId == school.id;
    });
    setFilteredStudents(filtered);
  }, [students]);

  const updateStudentSchool = ev => {
    console.log("student id selected: ", ev.target.value); //yielding correct ID
    setStudentSelection(ev.target.value);
    console.log("studentSelection set to: ", studentSelection); //BREAKS HERE yields empty array
    console.log("front end: ", { studentSelection, schoolId }); //yielding empty array
    axios
      .put("/api/updateStudent", { studentSelection, schoolId })
      .then(
        axios.get("/api/students").then(response => setStudents(response.data))
      ); //can filter instead of making another API call
  };

  return (
    <div className="container">
      <a href={`#view=school&id=${school.id}`}>
        <h3>{school.name}</h3>
      </a>
      <select onChange={ev => updateStudentSchool(ev)} value={studentSelection}>
        <option value="">-- enroll student --</option>
        {students
          .filter(student => student.schoolId !== school.id)
          .map(student => {
            return (
              <option value={student.id} key={student.id}>
                {student.name}
              </option>
            );
          })}
      </select>

      <ul>
        {filteredStudents.map(student => {
          return (
            <li key={student.id}>
              {student.name} <button>Unenroll</button>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SchoolList;

// <h1>{school.name}</h1>
//   <form>
//     <div id="selection">
//       <select onChange={updateStudentSchool}>
//         {students.map(student => {
//           return (
//             <option value={student.id} key={student.id}>
//               {student.name}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//   </form>
