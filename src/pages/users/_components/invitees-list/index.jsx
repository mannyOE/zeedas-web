import React from "react";
import "./style.scss";
import { ListGroup, ListGroupItem } from "reactstrap";
import PropTypes from "prop-types";
import AccountAvatar from "pages/users/user-profile/_components/account-avatar";
import colors from "utils/colors";
import ZeedasBadge from "zeedas-components/badge";
import { AppUtils } from "utils/app-utils";
import IconDeleteAlt from "../../../../zeedas-assets/icons/icon-delete-alt";
import AddPersonIcon from "../../../../zeedas-assets/icons/icon-add-person";

const InviteList = ({ data, deleteItem }) => (
  // <ListGroup className="InviteList" flush>
  //   {data.map((item, index) => (
  //     <ListGroupItem key={index} className="d-flex align-items-center p-0 border-0">
  //       <div className={`${index !== data.length - 1 && 'pb-0'}`}>
  //         <AddPersonIcon />
  //       </div>
  //       <div
  //         className={`d-flex justify-content-between align-items-center flex-grow-1 ml-4 ${
  //           index !== data.length - 1 && 'pb-0'
  //         }`}
  //       >
  //         <span className="font-bold font-14">{item.email}</span>
  //         <span onClick={() => deleteItem(index)}>
  //           <IconDeleteAlt width={15}/>
  //         </span>
  //       </div>
  //     </ListGroupItem>
  //   ))}
  // </ListGroup>

  <ListGroup className="InviteList" flush>
    {data.map((item, index) => (
      <ListGroupItem
        key={index}
        className="d-flex align-items-center p-0 border-0 mb-2"
      >
        <div className={`${index !== data.length - 1 && "pb-0"}`}>
          <div className="mr-2">
            <AccountAvatar
              source={item.user ? item.user.avatar : ""}
              backgroundColor={
                item.user ? item.user.avatarColor : "rgb(30, 150, 196)"
              }
              name={
                item.user
                  ? item.user.name
                    ? item.user.name
                    : item.user.email
                  : item.email
              }
              height={50}
              width={52}
              borderRadius={25}
              fontSize={12}
            />
          </div>
        </div>
        <div
          className={`d-flex justify-content-between align-items-center flex-grow-1 ml-4 ${
            index !== data.length - 1 && "pb-0"
          }`}
        >
          <div className="ml-3">
            <p className="font-bold mb-0 team-member-name">
              {item.user ? item.user.email : item.email}
            </p>
            <ZeedasBadge
              backgroundColor={colors.ZEEDAS_FADED_RED}
              color={colors.ZEEDAS_RED}
              style={{
                height: "24px",
                padding: "0 9px",
                fontWeight: "600",
              }}
            >
              <span
                className="text-capitalize font-normal role-badge"
                style={{ color: colors.ZEEDAS_ORANGE }}
              >
                {AppUtils.interpretRole(item.user ? item.roles[0] : item.role)}
              </span>
            </ZeedasBadge>
          </div>
          <span onClick={() => deleteItem(index)}>
            <IconDeleteAlt width={15} />
          </span>
        </div>
      </ListGroupItem>
    ))}
  </ListGroup>
);

InviteList.defaultProps = {
  data: [],
};

InviteList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  ),
  deleteItem: PropTypes.func.isRequired,
};

export default InviteList;
