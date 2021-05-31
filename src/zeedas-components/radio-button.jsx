import React from 'react';
import PropTypes from "prop-types";

const RadioButton = ({ name, checked, onChange, id }) => (
  <label className="container">
    <input
      type="radio"
      name={name}
      id={'radio-btn'}
      checked={checked}
      onChange={(e) => onChange(e, id)}
      value={id}
    />
    <span className="checkmark" />
  </label>
);

export default RadioButton;

RadioButton.defaultProps = {
  checked: "",
  name: "",
  onChange: () => {
    // your logic here...
  },
  id: "",
};

RadioButton.propTypes = {
  checked: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
};
