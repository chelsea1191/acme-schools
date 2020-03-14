import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateSchool = ({ school, setSchools }) => {
  const [newName, setNewName] = useState([]);
  const [schoolId, setSchoolId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (school) {
      //truthy when renders
      setNewName(school.name);
      setSchoolId(school.id);
    }
  }, [school]);

  const submitUpdate = () => {
    axios
      .put(`/api/schools/${schoolId}`, {
        newName: newName,
        schoolId: schoolId
      })
      .then(
        axios.get("/api/schools").then(response => setSchools(response.data))
      ) //need to filter instead of making another API call
      .then(() => {
        setNewName("");
        setSchoolId("");
      })
      .catch(ex => setError(ex.response.data.message));
    window.location.hash = "#";
  };

  const deleteSchool = async id => {
    await axios
      .delete(`/api/deleteSchool/${id}`)
      .then(
        axios.get("/api/schools").then(response => setSchools(response.data))
      ); //need to filter instead of making another API call
  };

  const handleInput = ev => {
    setNewName(ev.target.value);
  };

  const handleDelete = ev => {
    deleteSchool(school.id);
    window.location.hash = "#";
  };

  return (
    <div>
      <form onSubmit={() => submitUpdate(newName, schoolId)}>
        <h2>Edit School</h2>
        {error && <div>{error}</div>}
        <input value={newName} onChange={handleInput} />
        <button>Update</button>
      </form>
      <button onClick={handleDelete}>Delete School</button>
    </div>
  );
};
export default UpdateSchool;
