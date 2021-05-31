import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const ButtonIconArrowBorder = ({ icon, text, color, arrow, onClick }) => (
  <Button className="btn-icon-arrow-border" color={color} onClick={onClick}>
    <div className="btn-icon">{icon}</div>
    {text}
    <div className="btn-arrow-wrapper">
      <span className="btn-arrow">{arrow}</span>
    </div>
  </Button>
);
export default ButtonIconArrowBorder;

ButtonIconArrowBorder.defaultProps = {
  icon: <></>,
  text: "",
  color: "#eee",
  arrow: <></>,
  onClick: () => {
    // your logic here...
  },
};

ButtonIconArrowBorder.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  color: PropTypes.string,
  arrow: PropTypes.element,
  onClick: PropTypes.func,
};
