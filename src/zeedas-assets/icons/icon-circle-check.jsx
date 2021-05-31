import React from "react";
import PropTypes from "prop-types";

const IconCircleCheck = ({ fill, height, width }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.80469 0.421875C11.7311 0.421875 14.9141 3.60486 14.9141 7.53125C14.9141 11.4576 11.7311 14.6406 7.80469 14.6406C3.87829 14.6406 0.695312 11.4576 0.695312 7.53125C0.695312 3.60486 3.87829 0.421875 7.80469 0.421875ZM7.09368 10.7318L12.0702 5.75528L11.065 4.75002L7.09368 8.72129L4.89973 6.52734L3.89447 7.5326L7.09368 10.7318Z"
      fill={fill}
    />
  </svg>
);

export default IconCircleCheck;

IconCircleCheck.defaultProps = {
  fill: "#00B394",
  height: 15,
  width: 15,
};
IconCircleCheck.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};
