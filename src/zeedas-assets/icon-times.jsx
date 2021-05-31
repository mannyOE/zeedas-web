import React from 'react';
import PropTypes from "prop-types";

const IconTimes = ({ fill, height, width }) => (
  <svg  width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.59375 1.59375L13.4062 13.4062" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.59375 13.4062L13.4062 1.59375" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>


);

export default IconTimes;

IconTimes.defaultProps = {
  fill: "#fff",
  height: 15,
  width: 15,

};
IconTimes.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};
