import React from "react";
import { Progress } from "reactstrap";
import PropTypes from "prop-types";
const ProgressBar = ({ color, percentage, margin }) => {
  return (
    <div style={{ margin }}>
      <div className="text-left percentage-text">{percentage}% Completed</div>
      <Progress value={percentage} color={color} />
    </div>
  );
};

export default ProgressBar;

ProgressBar.defaultProps = {
  color: "",
  percentage: 0,
  margin: "",
};

ProgressBar.propTypes = {
  color: PropTypes.string,
  margin: PropTypes.string,
  copercentagelor: PropTypes.number,
};
