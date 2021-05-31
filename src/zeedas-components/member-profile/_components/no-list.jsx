import React from "react";

const NoList = ({ message, icon }) => (
  <div className="d-flex flex-column justify-content-center align-items-center empty-records">
    {/* <img src={icon} alt="no-records" /> */}
    <p>No records yet.</p>
  </div>
);

export default NoList;
