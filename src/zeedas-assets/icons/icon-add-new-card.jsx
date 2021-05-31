import React from 'react';
import PropTypes from "prop-types";

const IconAddNewCard = ({ fill, height, width }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.9133 12.0518H18.2815V13.6306H15.9133V15.9988H14.3345V13.6306H11.9664V12.0518H14.3345V9.68364H15.9133V12.0518ZM14.3341 4.15635V2.57756H1.70379V4.15635H14.3341ZM14.3341 7.31396H1.70379V12.0502H10.3876V13.629H1.70379C0.831491 13.629 0.125 12.9234 0.125 12.0502L0.132903 2.57756C0.132903 1.70446 0.831491 0.998779 1.70379 0.998779H14.3341C15.2064 0.998779 15.9129 1.70446 15.9129 2.57756V8.10485H14.3341V7.31396Z" fill={fill} />
  </svg>

);

export default IconAddNewCard;

IconAddNewCard.defaultProps = {
  fill: "#03293D",
  height: 16,
  width: 19,

};
IconAddNewCard.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};
