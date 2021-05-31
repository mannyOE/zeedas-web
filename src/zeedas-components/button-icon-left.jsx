import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const ButtonIconLeft = ({
  icon,
  text,
  color,
  onClick,
  fontColor,
  disabled,
  width,
  borderRadius,
  boxShadow,
  style,
  type,
}) => (
  <Button
    className="btn-icon-left"
    color={color}
    onClick={onClick}
    style={{
      color: fontColor,
      width,
      borderRadius,
      boxShadow,
      ...style,
    }}
    disabled={disabled}
    type={type}
  >
    { icon ? <div className="btn-icon">{icon}</div> : "" }
    {text}
  </Button>
);
export default ButtonIconLeft;

ButtonIconLeft.defaultProps = {
  icon: <></>,
  text: "",
  color: "#eee",
  fontColor: "#fff",
  width: "auto",
  borderRadius: "10px",
  type: "submit",
  boxShadow: "4px 4px 14px rgba(0, 0, 0, 0.15)",
  onClick: () => {
    // your logic here...
  },
  disabled: false,
  style: {},
};

ButtonIconLeft.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  color: PropTypes.string,
  fontColor: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.string,
};
