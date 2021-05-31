import React from 'react';
import PropTypes from "prop-types";

const IconAngleRight = ({ fill }) => (
  <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 7.93951L3.43952 4.50001L0 1.0605L1.0605 0L5.56052 4.50001L1.0605 9.00001L0 7.93951Z" fill={fill} />
  </svg>

);

export default IconAngleRight;

IconAngleRight.defaultProps = {
  fill: "#23B3E8",
};

IconAngleRight.propTypes = {
  fill: PropTypes.string,
};
