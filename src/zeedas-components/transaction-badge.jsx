import React from "react";
import PropTypes from "prop-types";

const TransactionBadge = ({
  status,
  bgColor,
  color,
  width,
  height,
  padding,
}) => (
  <div
    className="transaction-badge"
    style={{ backgroundColor: bgColor, color, width, height, padding }}
  >
    {status}
  </div>
);

export default TransactionBadge;

TransactionBadge.defaultProps = {
  status: "",
  bgColor: "#eee",
  color: "#eee",
  width: "100px",
  height: "26px",
  padding: "0",
};

TransactionBadge.propTypes = {
  status: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
};
