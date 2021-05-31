import React from 'react';
import PropTypes from 'prop-types';

const labelClasses = 'm-0 radio-button d-flex align-items-center ';

const RadioButtonSm = ({
  name,
  label,
  checked,
  onChange,
  id,
  disabled,
  sizeClass,
}) => (
  <label
    className={disabled ? labelClasses + 'disabled' : labelClasses}
    htmlFor={id}
  >
    <input
      type="radio"
      checked={checked}
      name={name}
      id={id}
      hidden
      onChange={(e) => onChange(e, id)}
      value={id}
      disabled={disabled}
    />
    <span className={`checkmark ${sizeClass && "checkmark-"+sizeClass}`} />
    {label}
  </label>
);

export default RadioButtonSm;

RadioButtonSm.defaultProps = {
  id: '',
  name: '',
  label: '',
  checked: false,
  disabled: false,
  sizeClass: '',
  onChange: () => {
    // your logic here...
  },
};

RadioButtonSm.propTypes = {
  id: PropTypes.string || PropTypes.number,
  name: PropTypes.string,
  label: PropTypes.any,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  sizeClass: PropTypes.string,
};
