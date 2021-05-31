import React from "react";

import { ListGroup, ListGroupItem } from "reactstrap";
import ZeedasCheckbox from "../../../../zeedas-components/checkbox";

const RoleListWithCheckbox = ({ roles, checkedRoles, onChangeTeamRole }) => {
  return (
    <ListGroup flush className="role-list">
      {roles &&
        roles.map((item, index) => (
          <ListGroupItem
            key={item.value}
            className="d-flex justify-content-between align-items-center role-item py-2 mb-2 px-0"
          >
            <div>
              <ZeedasCheckbox
                id={item.value}
                value={item.value}
                name={item.value}
                text={item.label}
                checked={checkedRoles.includes(item.value)}
                handleCheckboxChange={(e) => onChangeTeamRole(e, item.value)}
              />
            </div>
          </ListGroupItem>
        ))}
    </ListGroup>
  );
};

export default RoleListWithCheckbox;
