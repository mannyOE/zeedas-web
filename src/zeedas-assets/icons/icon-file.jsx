import React from 'react';
import PropTypes from 'prop-types';

const IconFile = ({ fill }) => (
  <svg
    width="13"
    height="16"
    viewBox="0 0 13 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 5.05952V4.98363L9.73646 1.68229L8.9375 2.36533L11.5917 5.05952H7.58333V0H0V15.9375H13V5.05952ZM11.9167 14.9256H1.08333V1.0119H6.5V6.07143H11.9167V14.9256Z"
      fill={fill}
    />
  </svg>
);

IconFile.defaultProps = {
  fill: '#23B3E8',
};

IconFile.propTypes = {
  fill: PropTypes.string,
};

export default IconFile;
