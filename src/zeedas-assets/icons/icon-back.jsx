import React from 'react';
import PropTypes from "prop-types";

const IconBack = ({ fill, width, height }) => (
  <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 6.99999V8.99999H3.98955L9.49477 14.5052L8.08057 15.9194L0.161133 7.99999L8.08057 0.0805664L9.49477 1.49478L3.98955 6.99999H16Z" fill={fill} />
  </svg>

);

export default IconBack;

IconBack.defaultProps = {
  fill: "#23B3E8",
  width: 16,
  height: 16,
};

IconBack.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
