import React from "react";
import PropTypes from "prop-types";

const CommentsIcon = ({ fill, width, height }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.08366 2.125H9.91699C11.4199 2.125 12.8612 2.72202 13.9239 3.78473C14.9866 4.84743 15.5837 6.28877 15.5837 7.79167C15.5837 9.29456 14.9866 10.7359 13.9239 11.7986C12.8612 12.8613 11.4199 13.4583 9.91699 13.4583V15.9375C6.37533 14.5208 1.41699 12.3958 1.41699 7.79167C1.41699 6.28877 2.01401 4.84743 3.07672 3.78473C4.13943 2.72202 5.58077 2.125 7.08366 2.125Z"
      fill={fill}
    />
  </svg>
);

CommentsIcon.defaultProps = {
  fill: "#03293D",
  width: 17,
  height: 17,
};

CommentsIcon.propTypes = {
  fill: PropTypes.string,
};
export default CommentsIcon;
