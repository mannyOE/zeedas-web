import React from 'react';

import { ListGroup, ListGroupItem } from 'reactstrap';
import RadioButton from '../../../../zeedas-components/radio-button';
import RadioButtonSm from '../../../app/_components/radio-button-sm';

const RoleList = ({ roles, onChangeRadioButton, selectedRole, name }) => {
  return (
    <ListGroup flush className="role-list">
      {roles &&
        roles.map((item, index) => (
          <ListGroupItem
            key={item.value}
            className="d-flex justify-content-between align-items-center role-item"
          >
            <RadioButtonSm
              name={name}
              label={<span className="ml-4">{item.label}</span>}
              id={item.value}
              value={item.value}
              checked={item.value === selectedRole}
              onChange={onChangeRadioButton}
              sizeClass={"md"}
            />
          </ListGroupItem>
        ))}
    </ListGroup>
  );
};

export default RoleList;
