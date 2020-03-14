import React, { useEffect } from "react";

const Unenrolled = ({ students, unenrolled, setUnenrolled }) => {
  useEffect(() => {
    setUnenrolled(students.filter(student => !student.schoolId));
  }, [students]);

  return (
    <div className="container">
      <h1>Unenrolled Students</h1>
      <ul>
        {unenrolled.map(each => {
          return (
            <li key={each.id}>
              <a href={`#view=student&id=${each.id}`}>{each.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Unenrolled;
