import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

const PlanningParameter = ({ title, className }) => {
  return (
    <div
      className={`PlanningParameter d-flex align-items-center justify-content-center font-10 ${className}`}
    >
      {title}
    </div>
  );
};

PlanningParameter.defaultProps = {
  title: '',
  className: '',
};
PlanningParameter.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default PlanningParameter;
