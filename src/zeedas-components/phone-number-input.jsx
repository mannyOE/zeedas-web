import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";

import PropTypes from "prop-types";

const ZeedasPhoneInput = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  handleError,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleChange = (phone) => {
    setPhoneNumber(phone);
    onChange(phone);
    if (!isPossiblePhoneNumber(phone)) {
      setError("Please enter a valid phone number");
      handleError(true);
    } else {
      setError("");
      handleError(false);
    }
  };
  return (
    <>
      {label && <p className="default-input-label">{label}</p>}
      <PhoneInput
        className={error ? "default-input-field error" : "default-input-field"}
        country="US"
        value={value}
        label={label}
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={handleChange}
      />
      {error && <span className="default-input-error__message">{error}</span>}
    </>
  );
};

ZeedasPhoneInput.defaultProps = {
  label: "",
  error: null,
  style: {},
};

ZeedasPhoneInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  style: PropTypes.object,
};
export default ZeedasPhoneInput;
