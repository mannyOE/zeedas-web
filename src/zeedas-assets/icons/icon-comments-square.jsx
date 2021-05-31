import React from "react";
import PropTypes from "prop-types";

const SquareCommentsIcon = ({ fill, count }) => (
  <div className="SquareCommentsIcon position-relative d-inline-block">
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path
          d="M32.9875 6.5C32.9875 5.125 31.875 4 30.5 4H10.5C9.125 4 8 5.125 8 6.5V21.5C8 22.875 9.125 24 10.5 24H28L33 29L32.9875 6.5Z"
          fill={fill}
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="41"
          height="41"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
    <div
      style={{
        position: "absolute",
        left: "17.5px",
        fontSize: "9px",
        color: "white",
        top: "8px",
      }}
    >
      {count || 0}
    </div>
  </div>
);

SquareCommentsIcon.defaultProps = {
  fill: "#A5A4A4",
};

SquareCommentsIcon.propTypes = {
  fill: PropTypes.string,
  count: PropTypes.number,
};

export default SquareCommentsIcon;
