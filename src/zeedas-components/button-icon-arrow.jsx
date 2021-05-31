import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const ButtonIconArrow = ({
  icon, text, color, arrow, onClick,
}) => (
  <Button
    className="btn-icon-arrow"
    color={color}
    onClick={onClick}
  >
    <div className="btn-icon">{icon}</div>
    {text}
    <span className="btn-arrow">
      {arrow}
    </span>
  </Button>
);
export default ButtonIconArrow;

ButtonIconArrow.defaultProps = {
  icon: <></>,
  text: "",
  color: "#eee",
  arrow: <></>,
  onClick: () => {
    // your logic here...
  },
};

ButtonIconArrow.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  color: PropTypes.string,
  arrow: PropTypes.element,
  onClick: PropTypes.func,
};
