import React from "react";

import { ListGroup, ListGroupItem, CustomInput } from "reactstrap";
import ZeedasCheckbox from "../../../zeedas-components/checkbox";
const EditRoleList = ({
  roles,
  onChangeTeamRole,
  isChecked,
  selectedRole,
  name,
}) => {
  return (
    <ListGroup
      flush
      className="role-list nhh"
      style={{
        borderLeft: " 1px solid rgba(0, 0, 0, 0.125)",
        borderRight: " 1px solid rgba(0, 0, 0, 0.125)",
      }}
    >
      {roles &&
        roles.map((item, index) => (
          <ListGroupItem
            key={item.value}
            className="d-flex justify-content-between align-items-center role-item"
          >
            {isChecked !== undefined && (
              <div>
                <ZeedasCheckbox
                  id={item.value}
                  value={item.value}
                  name={item.value}
                  text={item.value}
                  checked={isChecked[item.value]}
                  // checked={item.checked}
                  handleCheckboxChange={(e) => onChangeTeamRole(e, item.value)}
                />
                {/* <CustomInput
                  type="checkbox"
                  id={`zeedas-checkbox-edit-${item.value}`}
                  label={item.value}
                  name={item.value}
                  checked={isChecked[item.value]}
                  onChange={onChangeTeamRole}
                /> */}
              </div>
            )}
          </ListGroupItem>
        ))}
    </ListGroup>
  );
};

export default EditRoleList;
