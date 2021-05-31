import React from 'react';
import './style.scss';
import { ListGroup, ListGroupItem } from 'reactstrap';
import colors from 'utils/colors';
import ZeedasCheckbox from '../../../../zeedas-components/checkbox';
import AccountAvatar from '../../../users/user-profile/_components/account-avatar';
const RoleList = ({
  id,
  roles,
  onChangeRole,
  isChecked,
  teamList,
  selectedRole,
  name,
}) => {
  return (
    <ListGroup flush className="RoleList project-team">
      {teamList &&
        teamList.map((item, index) => (
          <ListGroupItem
            key={item._id}
            className="d-flex justify-content-between align-items-center role-item p-3"
          >
            <div className="d-flex no-block justify-content-between align-items-center  w-100">
              <div className="mr-2 d-flex no-block justify-content-between align-items-center">
                <AccountAvatar
                  userDetails={item.user}
                  dimension={30}
                  borderRadius={100}
                  fontSize={12}
                  backgroundColor={colors.ZEEDAS_BLUE}
                />
                <div className="ml-3">
                  <p className="font-bold mb-0 team-member-name">
                    {item.user && item.user.name}
                  </p>
                </div>
              </div>
              <span class="position-relative" style={{ top: '-13px' }}>
                <ZeedasCheckbox
                  id={item._id}
                  value={item.user._id}
                  name={item.user._id}
                  checked={isChecked[item.user._id]}
                  // checked={item.checked}
                  handleCheckboxChange={(e) => onChangeRole(e, item)}
                />
              </span>
            </div>
            {/* {isChecked !== undefined && (
              <div>
                <ZeedasCheckbox
                  id={`${id}${item.value}`}
                  value={item.value}
                  name={item.value}
                  text={item.value}
                  checked={isChecked[item.value]}
                  // checked={item.checked}
                  handleCheckboxChange={(e) => onChangeRole(e, item.value)}
                />
              </div>
            )} */}
          </ListGroupItem>
        ))}
    </ListGroup>
  );
};

export default RoleList;
