import React from 'react';
import PropTypes from 'prop-types';

const IconBellFilled = ({ fill }) => (
  <svg
    width="9"
    height="11"
    viewBox="0 0 9 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.50033 10.918C5.09887 10.918 5.58366 10.4332 5.58366 9.83464H3.41699C3.41699 10.4332 3.90178 10.918 4.50033 10.918ZM7.75033 7.66797V4.95964C7.75033 3.29401 6.8647 1.90464 5.31283 1.5363V1.16797C5.31283 0.718385 4.94991 0.355469 4.50033 0.355469C4.05074 0.355469 3.68783 0.718385 3.68783 1.16797V1.5363C2.13595 1.90464 1.25033 3.29401 1.25033 4.95964V7.66797L0.166992 8.7513V9.29297H8.83366V8.7513L7.75033 7.66797Z"
      fill={fill}
    />
  </svg>
);

IconBellFilled.defaultProps = {
  fill: '#EB0E43',
};

IconBellFilled.propTypes = {
  fill: PropTypes.string,
};

export default IconBellFilled;
