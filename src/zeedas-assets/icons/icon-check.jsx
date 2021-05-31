import React from 'react';
import PropTypes from "prop-types";

const IconCheck = ({ fill, height, width }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5001 1.83329L5.50008 11.8333L0.916748 7.24996L2.09526 6.07146L5.50008 9.47629L14.3216 0.654785L15.5001 1.83329Z" fill={fill} />
  </svg>

);

export default IconCheck;

IconCheck.defaultProps = {
  fill: "#6AC895",
  height: 12,
  width: 16,
};
IconCheck.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};
