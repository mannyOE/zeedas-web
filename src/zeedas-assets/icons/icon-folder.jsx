import React from 'react';
import PropTypes from 'prop-types';

const IconFolder = ({ fill }) => (
  <svg
    width="15"
    height="13"
    viewBox="0 0 15 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.3182 1.16071C14.6947 1.16071 15 1.47252 15 1.85714V2.90179C15 3.0941 14.8474 3.25 14.6591 3.25H0.340909C0.15263 3.25 0 3.0941 0 2.90179V0.696429C0 0.311802 0.30526 0 0.681818 0H3.82448C3.98398 0 4.13843 0.0571183 4.26097 0.161417L5.24533 0.999297C5.36786 1.1036 5.52232 1.16071 5.68182 1.16071H14.3182ZM14.3182 13H0.681818C0.30526 13 0 12.6882 0 12.3036V4.29464C0 4.10233 0.15263 3.94643 0.340909 3.94643H14.6591C14.8474 3.94643 15 4.10233 15 4.29464V12.3036C15 12.6882 14.6947 13 14.3182 13Z"
      fill={fill}
    />
  </svg>
);

IconFolder.defaultProps = {
  fill: '#23B3E8',
};

IconFolder.propTypes = {
  fill: PropTypes.string,
};

export default IconFolder;
