import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const BlockLevelButton = ({
  color, children, onClick, border, disabled, disabledColor, type,
}) => (
  <div>
    <Button
      disabled={disabled}
      className="btn button-block"
      color={disabled ? disabledColor || color : color}
      size="lg"
      block
      onClick={onClick}
      type={type}
      style={{ border }}
    >
      {children}
    </Button>
  </div>
);

export default BlockLevelButton;

BlockLevelButton.defaultProps = {
  color: "#eee",
  children: <></>,
  type: "button",
  onClick: () => {
    // your logic here...
  },
  border: "2px solid rgba(0, 0, 0, 0.19)",
  disabled: false,
};

BlockLevelButton.propTypes = {
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
  border: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};
