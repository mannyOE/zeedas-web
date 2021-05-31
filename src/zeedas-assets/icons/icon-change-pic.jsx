import React from 'react';
import PropTypes from "prop-types";

const IconChangePic = ({ height, width }) => (
  <svg width={width} height={height} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.25 12.25H11C11.6904 12.25 12.25 11.6904 12.25 11V2.25C12.25 1.55964 11.6904 1 11 1H2.25C1.55964 1 1 1.55964 1 2.25V11C1 11.6904 1.55964 12.25 2.25 12.25ZM2.25 12.25L9.125 5.375L12.25 8.5M5.375 4.4375C5.375 4.95527 4.95527 5.375 4.4375 5.375C3.91973 5.375 3.5 4.95527 3.5 4.4375C3.5 3.91973 3.91973 3.5 4.4375 3.5C4.95527 3.5 5.375 3.91973 5.375 4.4375Z" stroke="#23B3E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);

export default IconChangePic;

IconChangePic.defaultProps = {
  height: 13,
  width: 13,

};
IconChangePic.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};
