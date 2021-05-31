import React, { useState } from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown,
  DropdownToggle,
} from 'reactstrap';
import { EditIcon } from 'zeedas-assets/icons/icon-edit';
import { TrashIcon } from 'zeedas-assets/icons/icon-trash';
import colors from 'utils/colors';

const iconProps = {
  dimension: {
    width: 12.8,
    height: 10,
  },
};

const deleteIconProps = { ...iconProps, color: colors.ZEEDAS_RED };
const editIconProps = { ...iconProps, color: '#8c929b' };

const ModuleCardDropdown = ({ handleEdit, handleDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const toggleDropdown = (event) => {
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };
  const _handleDelete = (event) => {
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    handleDelete();
  };
  const _handleEdit = (event) => {
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    handleEdit();
  };

  return (
    <Dropdown direction="right" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        tag="a"
        className="ModuleCard__menu-btn ml-2"
        onClick={toggleDropdown}
      >
        •••
      </DropdownToggle>
      <DropdownMenu
        className="ModuleCard__menu p-2"
        positionFixed ={true}
        left={true}
      >
        <DropdownItem
          className="d-flex align-items-center"
          onClick={_handleEdit}
        >
          <EditIcon {...editIconProps} />
          <span className="ml-2">Edit Module</span>
        </DropdownItem>
        <DropdownItem
          className="d-flex align-items-center"
          onClick={_handleDelete}
        >
          <TrashIcon {...deleteIconProps} />
          <span className="ml-2" style={{ color: colors.ZEEDAS_RED }}>
            Remove from Project
          </span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ModuleCardDropdown;
