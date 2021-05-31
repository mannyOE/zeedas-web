import React from "react";
import { CustomInput } from "reactstrap";
import PropTypes from "prop-types";

const ZeedasCheckbox = ({
  text,
  checked,
  handleCheckboxChange,
  id,
  name,
  square,
  disabled,
}) => (
  <>
    <CustomInput
      type="checkbox"
      id={`zeedas-checkbox-${id}`}
      label={text}
      name={name}
      disabled={disabled}
      checked={checked}
      onChange={handleCheckboxChange}
      className={`${square ? "square" : ""}`}
    />
  </>
);

ZeedasCheckbox.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  square: PropTypes.bool,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default ZeedasCheckbox;
