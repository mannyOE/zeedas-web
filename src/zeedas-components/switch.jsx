import React from 'react';
import { PropTypes } from 'prop-types';

const Switch = ({ isActive, toggleSwitch }) => {
  return (
    <a
      className={isActive ? 'switch active' : 'switch'}
      onClick={() => toggleSwitch()}
    >
      <div className="switch_wrapper">
        <div className="switch_toggle"></div>
      </div>
    </a>
  );
};

Switch.defaultProps = {
  isActive: false,
  toggleSwitch: () => {},
};

Switch.propTypes = {
  isActive: PropTypes.bool,
  toggleSwitch: PropTypes.func,
};

export default Switch;
