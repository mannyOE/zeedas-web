import React from 'react';
import PropTypes from 'prop-types';

const IconConnect = ({ stroke }) => (
  <svg
    width="28"
    height="27"
    viewBox="0 0 28 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 17.3333C19.7909 17.3333 18 19.0496 18 21.1667C18 23.2838 19.7909 25 22 25C24.2091 25 26 23.2838 26 21.1667C26 19.0496 24.2091 17.3333 22 17.3333ZM22 17.3333V8.38889C22 7.71111 21.719 7.0611 21.219 6.58184C20.7189 6.10258 20.0406 5.83333 19.3333 5.83333H15.3333M6 9.66667C8.20914 9.66667 10 7.95042 10 5.83333C10 3.71624 8.20914 2 6 2C3.79086 2 2 3.71624 2 5.83333C2 7.95042 3.79086 9.66667 6 9.66667ZM6 9.66667V25"
      stroke={stroke}
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

IconConnect.defaultProps = {
  stroke: '#23B3E8',
};

IconConnect.propTypes = {
  stroke: PropTypes.string,
};

export default IconConnect;
