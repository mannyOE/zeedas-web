import React from 'react';
import PropTypes from "prop-types";

export const CaretCard = ({
  text, bgColor, color, width, height, left, right, top,
  pointerMargin, displayCaretCard,
}) => (
  <div style={{ display: displayCaretCard ? "block" : "none" }}>
    <div
      id="main"
      style={{
        backgroundColor: bgColor, color, width, height, left, right, top,
      }}
    >
      <p>{text}</p>
    </div>
    <div
      style={{ borderBottomColor: bgColor, margin: pointerMargin }}
      id="pointer"
    />
  </div>
);

export const CaretCard2 = ({ text, displayCaretCard }) => (
  <div
    className="caret-card-2"
    style={{ display: displayCaretCard ? "block" : "none" }}
  >
    <p>{text}</p>
  </div>
);
// export default CaretCard;

CaretCard.defaultProps = {
  text: "",
  bgColor: "#23b3e8",
  color: "#fff",
  width: "250px",
  height: "98px",
  // right: "-281%",
  left: "-157px",
  top: "79%",
  pointerMargin: "-34px 0 0 -0px",
  displayCaretCard: true,
};

CaretCard.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  // right: PropTypes.string,
  left: PropTypes.string,
  top: PropTypes.string,
  pointerMargin: PropTypes.string,
  displayCaretCard: PropTypes.bool,
};

CaretCard2.defaultProps = {
  text: "",
  displayCaretCard: true,
};

CaretCard2.propTypes = {
  text: PropTypes.string,
  displayCaretCard: PropTypes.bool,

};
