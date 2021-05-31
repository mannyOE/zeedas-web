import React from "react";
import PropTypes from "prop-types";

const Chips = ({ deleteChip, text, backgroundColor, borderColor }) => {
  return (
  <>
    <div
      style={{ backgroundColor: backgroundColor, border: borderColor }}
      className="chip mr-2"
    >
      <div>
        <span>{text}</span>
        <span className="closebtn" onClick={deleteChip}>
          &times;
        </span>
      </div>
    </div>
  </>
);
} 

export default Chips;

Chips.defaultProps = {
  deleteChip: () => {
    // your logic here...
  },
  text: "",
  width: "",
  justifyContent: "",
  display: "",
  backgroundColor: "#E8E7EA",
};

Chips.propTypes = {
  deleteChip: PropTypes.func,
  text: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
};
