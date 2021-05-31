import React from "react";
import PropTypes from "prop-types";

const IconPlus = ({ height, width, stroke }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 1V14"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 7.5H14"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default IconPlus;

IconPlus.defaultProps = {
  stroke: "#FAFAFA",
  height: 15,
  width: 15,
};
IconPlus.propTypes = {
  stroke: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};
