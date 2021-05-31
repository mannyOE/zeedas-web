import React from 'react';
import { FaShare } from "react-icons/fa";
import PropTypes from "prop-types";

const IconTransactionRecieved = ({ bgColor, color }) => (
  <span>
    <FaShare style={{ backgroundColor: bgColor, color }} className="icon-transaction" size={35} />
  </span>
);

export default IconTransactionRecieved;

IconTransactionRecieved.defaultProps = {
  bgColor: "#eee",
  color: "#eee",
};

IconTransactionRecieved.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
};
