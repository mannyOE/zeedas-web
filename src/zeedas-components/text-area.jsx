import React from "react";
import PropTypes from "prop-types";
import Colors from "../utils/colors";

const inputStyle = {
  width: "100%",
  border: "none",
  background: "rgba(26, 12, 47, 0.06)",
  borderRadius: "10px",
  color: `${Colors.ZEEDAS_DARK_BLUE}`,
  padding: "28px",
};

const labelStyle = {
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  lineHeight: "16px",
  color: `${Colors.ZEEDAS_DARK_BLUE}`,
};

const ZeedasTextArea = (props) => (
  <>
    <p style={labelStyle}>{props.label}</p>
    <textarea style={inputStyle} {...props} rows="4" />
  </>
);

ZeedasTextArea.defaultProps = {
  label: "",
};

ZeedasTextArea.propTypes = {
  label: PropTypes.string,
};
export default ZeedasTextArea;
