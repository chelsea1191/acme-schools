import React, { useState } from "react";
import axios from "axios";

const CreateSchool = ({ schools, setSchools }) => {
  const [newSchool, setNewSchool] = useState("");

  const onChange = ev => {
    setNewSchool(ev.target.value);
  };
  const createSchool = ev => {
    ev.preventDefault();
    axios
      .post("/api/createSchool", { newSchool })
      .then(response => setSchools([...schools, response.data]));
  };
  return (
    <div className="container">
      <h1>Create School</h1>
      <form onSubmit={createSchool}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={newSchool}
            onChange={onChange}
            placeholder="school name"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateSchool;
