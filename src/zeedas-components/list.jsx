import React from 'react';
import PropTypes from "prop-types";

const List = ({ data }) => (
  <div className="list-widget">
    <ul className="list-style-none list-body m-0 pb-3">
      {data.map((item, i) => (
        <li key={i} className="list-item">
          <div className={`list-icon ${item.color}`}>{item.icon}</div>
          {' '}
          {item.transaction}
          {' '}
          <span className="ml-auto font-12 text-muted">{item.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default List;

List.defaultProps = {
  data: [],
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.object],
  )),
};
