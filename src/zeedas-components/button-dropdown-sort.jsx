import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ButtonDropdownSort = ({
  color,
  text,
  icon,
  type,
  options,
  onSelect,
}) => (
  <UncontrolledButtonDropdown>
    <DropdownToggle className="button-dropdown-sort" caret color={color}>
      { icon && <div className="btn-icon">{icon}</div> }
      {text}
    </DropdownToggle>
    <DropdownMenu>
      {
        options.map((sortOption) => (
          <DropdownItem
            onClick={(e) => onSelect(sortOption, type)}
          >
            { sortOption.label }
          </DropdownItem>
        ))
      }
    </DropdownMenu>
  </UncontrolledButtonDropdown>
);

export default ButtonDropdownSort;
ButtonDropdownSort.defaultProps = {
  icon: null,
  text: "",
  color: "#eee",
  type: "",
  options: [],
  onSelect: () => ({}),
};
ButtonDropdownSort.propTypes = {
  icon: PropTypes.element || null,
  text: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.oneOf(["sort", "filter", ""]),
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  onSelect: PropTypes.func,
};
