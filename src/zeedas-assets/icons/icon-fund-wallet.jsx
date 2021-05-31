import React from 'react';
import PropTypes from "prop-types";

const IconFundWallet = ({ width, height, fill }) => (
    <svg width={width} height={height} viewBox="0 0 22 19" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.9989 4.00048V2.00048L5.99915 2V4L19.9989 4.00048ZM19.9991 12L19.9988 7.00076L5.99902 7.00026L5.99939 11.9995L19.9991 12ZM19.9989 0.000490188C21.1039 0.000490188 21.9989 0.89445 21.9989 2.00049L21.9991 12C21.9991 13.1061 21.1042 14 19.9991 14L5.99939 13.9995C4.89437 13.9995 3.99939 13.1056 3.99939 11.9995L4.00915 2C4.00915 0.89396 4.89412 0 5.99915 0L19.9989 0.000490188ZM2 16.0015H17V18.0015L2.00024 18.001C0.89522 18.001 0.000239968 17.107 0.000239968 16.001L0 5.00146H2V16.0015Z" fill={fill} />
    </svg>
);

export default IconFundWallet;

IconFundWallet.defaultProps = {
  fill: "#fff",
  width: 22,
  height: 19,

};
IconFundWallet.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
