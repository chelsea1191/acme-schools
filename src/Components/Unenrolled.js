import React from "react";

const Unenrolled = ({ unenrolled }) => {
  return (
    <div className="container">
      <h1>Unenrolled Students</h1>
      <ul>
        {unenrolled.map(each => {
          return <li key={each.id}>{each.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Unenrolled;
