import React from "react";
import PropTypes from "prop-types";

const IconTrashAlt = ({ fill, height, width }) => (
  <svg
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.5">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6667 4H11.94L10.7367 14.7447C10.658 15.4487 10.0413 16 9.33333 16H4C3.29067 16 2.67533 15.448 2.59733 14.7433L1.41333 4H0.666667C0.298667 4 0 3.70133 0 3.33333C0 2.96533 0.298667 2.66667 0.666667 2.66667H4V2C4 0.897333 4.89733 0 6 0H7.33333C8.436 0 9.33333 0.897333 9.33333 2V2.66667H12.6667C13.0347 2.66667 13.3333 2.96533 13.3333 3.33333C13.3333 3.70133 13.0347 4 12.6667 4ZM8 2C8 1.63267 7.70067 1.33333 7.33333 1.33333H6C5.63267 1.33333 5.33333 1.63267 5.33333 2V2.66667H8V2ZM2.75467 4L3.92333 14.598C3.926 14.624 3.97333 14.6667 4 14.6667H9.33333C9.36 14.6667 9.40867 14.6233 9.412 14.5967L10.5987 4H2.75467Z"
        fill="#182538"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="13.3333" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default IconTrashAlt;

IconTrashAlt.defaultProps = {
  fill: "#FF7070",
  height: 16,
  width: 12,
};
IconTrashAlt.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};
