import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const DefaultButton = ({
  children,
  className,
  color,
  border,
  onClick,
  disabled,
  style,
  type,
}) => (
  <Button
    className={`default-button ${className}`}
    color={color}
    style={{ border, ...style }}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </Button>
);
export default DefaultButton;

DefaultButton.defaultProps = {
  children: <></>,
  className: "",
  color: "#eee",
  type: "button",
  border: "2px solid rgba(0, 0, 0, 0.19)",
  onClick: () => {
    // your logic here...
  },
  disabled: false,
};

DefaultButton.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};
