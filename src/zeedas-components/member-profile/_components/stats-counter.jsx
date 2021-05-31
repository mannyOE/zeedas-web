import React from "react";

const StatsCounter = ({ icon, count }) => (
  <div className="stats-counter-container d-flex align-items-center">
    <span className="mr-2">{icon}</span>
    <span className="font-medium">{count}</span>
  </div>
);

export default StatsCounter;
