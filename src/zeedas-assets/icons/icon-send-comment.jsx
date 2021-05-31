import React from "react";
import PropTypes from "prop-types";

const IconSendComment = ({ fill }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.3891 15.3333C10.3716 15.3333 10.3549 15.3325 10.3382 15.3316C9.96158 15.3091 9.64742 15.0358 9.57242 14.6658L8.29075 8.35997C8.22408 8.03163 7.96825 7.7758 7.63992 7.70913L1.33408 6.42663C0.964082 6.35247 0.690748 6.0383 0.668248 5.66163C0.645748 5.28413 0.878248 4.93913 1.23658 4.8208L14.5699 0.376633C14.8691 0.274966 15.1991 0.3533 15.4224 0.577466C15.6457 0.8008 15.7232 1.1308 15.6241 1.42997L11.1791 14.7633C11.0657 15.1058 10.7457 15.3333 10.3891 15.3333Z"
      fill={fill}
    />
  </svg>
);

IconSendComment.defaultProps = {
  fill: "#231F20",
};

IconSendComment.propTypes = {
  fill: PropTypes.string,
};

export default IconSendComment;
