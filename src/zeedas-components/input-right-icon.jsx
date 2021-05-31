import React from 'react';
import PropTypes from "prop-types";

const InputRightIcon = ({
  label, icon, type, placeholder, onChange, name, value, id,
}) => (
  <div className="input-icons">
    <label>{label}</label>
    <input
      className="input-field"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      value={value}
      id={id}
      min={0}
    />
    <span className="input-icon">
      {icon}
    </span>
  </div>

);

export default InputRightIcon;

InputRightIcon.defaultProps = {
  label: "",
  icon: <></>,
  type: "text",
  placeholder: "Enter",
  onChange: () => {
  },
  name: "",
  value: "",
  id: "",
};

InputRightIcon.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
};
