import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateStudent = (students, setStudents, schools, setSchools, params) => {
  let [newName, setNewName] = useState();
  let [newSchool, setNewSchool] = useState();
  console.log("params from component: ", params);

  return (
    <div className="updateContainer">
      <h1>hello</h1>
    </div>
  );
};
export default UpdateStudent;
