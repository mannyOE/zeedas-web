import React from 'react';
import PropTypes from 'prop-types';

export const ClockIcon = ({ dimension, color, strokeWidth }) => {
  const { width, height } = dimension;
  return (
    <svg
      id="Capa_1"
      enable-background="new 0 0 443.294 443.294"
      height={height}
      viewBox="0 0 443.294 443.294"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"
      />
      <path
        strokeWidth={strokeWidth}
        fill={color}
        d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"
      />
    </svg>
  );
};

ClockIcon.propTypes = {
  dimension: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
};
