import React from "react";
import { FaShare } from "react-icons/fa";
import PropTypes from "prop-types";
import { appConstants } from "../constants";

const IconTransactionWithdrawn = ({ bgColor, color }) => (
  <span>
    <FaShare
      style={{ backgroundColor: bgColor, color }}
      className="icon-transaction withdrawn"
      size={35}
    />
  </span>
);

export default IconTransactionWithdrawn;

IconTransactionWithdrawn.defaultProps = {
  bgColor: appConstants.TRANSACTION_LIGHT_RED,
  color: appConstants.TRANSACTION_RED,
};

IconTransactionWithdrawn.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
};
