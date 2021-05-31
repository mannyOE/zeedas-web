import React from 'react';
import PropTypes from "prop-types";

const IconClearAll = ({ fill }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.16655 5.83128H13.8322V4.1677H2.16655V5.83128ZM0.497803 9.16878H12.1686V7.50003H0.497803V9.16878ZM3.8353 0.835449V2.49899H15.501V0.835449" fill={fill} />
  </svg>

);

export default IconClearAll;

IconClearAll.defaultProps = {
  fill: "#fff",
};

IconClearAll.propTypes = {
  fill: PropTypes.string,
};
