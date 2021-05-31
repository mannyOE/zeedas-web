import React from 'react';
import PropTypes from 'prop-types';
import { APP_NEED_OPTIONS } from '../../../utils/constants';

const ConfigSidebar = ({
  menuItems,
  handleTabChange,
  activeItemId,
  disabled,
}) => {
  return (
    <div className="config-sidebar h-100">
      <ul className="m-0 py-5">
        {menuItems.map((item, index) => (
          <li
            className={`config-sidebar__item pb-4 ${index !== 0 && 'pt-4 '} ${
              item.id === activeItemId ? 'active' : ''
            } ${
              disabled && item.name === APP_NEED_OPTIONS.server
                ? 'disabled'
                : ''
            }`}
            key={item.id}
          >
            <a href="#!" onClick={() => handleTabChange(item, disabled)}>
              <div className="position-relative">
                <h2 className="config-sidebar__item--title font-bold font-16 m-0">
                  {item.title}
                </h2>
                <span className="config-sidebar__item--subtitle font-12">
                  {item.subtitle}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

ConfigSidebar.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleTabChange: PropTypes.func.isRequired,
  activeItemId: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
};

export default ConfigSidebar;
