import React from 'react';
import PropTypes from "prop-types";

const IconMastercard2 = ({
  width1, height1, width2, height2,
}) => (
  <svg width={width1} height={height1} viewBox={`0 0 ${width2} ${height2}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M46.8567 37.4997C46.8567 50.4454 36.3694 60.935 23.4283 60.935C10.4872 60.935 0 50.4431 0 37.4997C0 24.5563 10.4898 14.0645 23.4283 14.0645C36.3669 14.0645 46.8567 24.5563 46.8567 37.4997Z" fill="#E2574C" />
    <path d="M51.565 14.0645C46.3108 14.0645 41.4737 15.8151 37.5647 18.7376L37.5835 18.7399C38.3522 19.4827 39.2004 20.0055 39.8543 20.8607L34.9797 20.938C34.2158 21.7091 33.5198 22.5481 32.8636 23.42H41.4595C42.1134 24.2049 42.718 24.8871 43.2665 25.7541H31.3052C30.8669 26.5087 30.4616 27.2844 30.1076 28.0905H44.6282C45.0079 28.8942 45.3477 29.5014 45.636 30.3521H29.2476C28.9875 31.1608 28.7649 31.9879 28.596 32.8315H46.3226C46.4961 33.6424 46.6295 34.3922 46.721 35.1564H28.2444C28.167 35.9275 28.1272 36.7101 28.1272 37.5H46.8544C46.8544 38.3297 46.7958 39.0982 46.7115 39.8436H28.2444C28.3241 40.6381 28.4413 41.4185 28.596 42.1872H46.2943C46.1116 42.9465 45.9005 43.7104 45.6358 44.5026H29.1936C29.4419 45.304 29.7445 46.0821 30.0747 46.8413H44.6282C44.2252 47.6944 43.7682 48.3764 43.2644 49.1755H31.2633C31.7367 49.9957 32.2593 50.7783 32.8263 51.5284L41.4598 51.6571C40.7239 52.5406 39.7795 53.0726 38.9193 53.846C38.966 53.8835 37.5436 53.8414 34.743 53.7969C39.0036 58.1935 44.9585 60.9353 51.5648 60.9353C64.5082 60.9353 75 50.4432 75 37.5C75 24.5568 64.5105 14.0645 51.565 14.0645Z" fill="#F4B459" />
  </svg>

);

export default IconMastercard2;

IconMastercard2.defaultProps = {
  width1: 75,
  width2: 75,
  height1: 75,
  height2: 75,
};

IconMastercard2.propTypes = {
  width1: PropTypes.number,
  width2: PropTypes.number,
  height1: PropTypes.number,
  height2: PropTypes.number,
};
