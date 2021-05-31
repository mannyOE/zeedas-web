import React from 'react';
import PropTypes from "prop-types";

const IconDelete = ({ fill, height, width }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.00008 13.8333C1.00008 14.75 1.75008 15.5 2.66675 15.5H9.33342C10.2501 15.5 11.0001 14.75 11.0001 13.8333V3.83333H1.00008V13.8333ZM3.05008 7.9L4.22508 6.725L6.00008 8.49167L7.76675 6.725L8.94175 7.9L7.17508 9.66667L8.94175 11.4333L7.76675 12.6083L6.00008 10.8417L4.23342 12.6083L3.05842 11.4333L4.82508 9.66667L3.05008 7.9ZM8.91675 1.33333L8.08342 0.5H3.91675L3.08342 1.33333H0.166748V3H11.8334V1.33333H8.91675Z" fill={fill} />
  </svg>

);

export default IconDelete;

IconDelete.defaultProps = {
  fill: "#FF7070",
  height: 16,
  width: 12,

};
IconDelete.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};
