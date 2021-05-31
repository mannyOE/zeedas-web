import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const PlanningTag = ({
  title,
  onRemove,
  active,
  className,
  onSelectTag,
  hideRemove,
}) => {
  return (
    <div
      onClick={() => onSelectTag()}
      className={`PlanningTag d-inline-flex align-items-center justify-content-between text-capitalize ${
        active ? 'active' : ''
      } ${className}`}
    >
      <span className="PlanningTag__title mr-1">{title}</span>
      {!hideRemove && (
        <a className="PlanningTag__remove font-12" onClick={() => onRemove()}>
          &times;
        </a>
      )}
    </div>
  );
};

PlanningTag.defaultProps = {
  title: '--',
  className: '',
  hideRemove: true,
};
PlanningTag.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default PlanningTag;
