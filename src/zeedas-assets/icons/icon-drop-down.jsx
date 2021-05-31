import React from 'react';
import PropTypes from 'prop-types';

const IconDropDown = ({height, width, fill}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.17785 0L4.99953 3.82169L8.8212 0L9.99953 1.17833L4.99953 6.17836L-0.000488281 1.17833L1.17785 0Z"
        fill={fill}
      />
    </svg>
  );
};

IconDropDown.defaultProps = {
  fill: "white",
  width: 10,
  height: 7
};

IconDropDown.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};


export default IconDropDown;
