import React from "react";
import PropTypes from "prop-types";

const ZeedasInput = (props) => (
  <>
    {props.label && <p className="default-input-label">{props.label}</p>}
    <input
      style={props.style}
      className={
       ( props.error || props.isError) ? 'default-input-field error' : 'default-input-field'
      }
      {...props}
    />
    {props.error && (
      <span className="default-input-error__message">{props.error}</span>
    )}
  </>
);

ZeedasInput.defaultProps = {
  label: "",
  error: null,
  style: {},
};

ZeedasInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  style: PropTypes.object,
};
export default ZeedasInput;
