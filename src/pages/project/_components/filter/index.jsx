import React, { useState } from "react";
import "./style.scss";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import PropTypes from "prop-types";
import { AppUtils } from "utils/app-utils";
import { APP_ROLES } from "utils/constants";
import { withRouter } from "react-router-dom";
import AvatarSingle from "zeedas-components/avatar-single";
import { useSelector } from "react-redux";
import colors from "utils/colors";

const UserIcon = () => (
  <svg
    width="11"
    height="10"
    viewBox="0 0 11 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.54545 9V8.11111C7.54545 7.63962 7.37305 7.18743 7.06617 6.85403C6.7593 6.52063 6.34308 6.33333 5.90909 6.33333H2.63636C2.20237 6.33333 1.78616 6.52063 1.47928 6.85403C1.1724 7.18743 1 7.63962 1 8.11111V9M10 9V8.11111C9.99973 7.71721 9.87905 7.33457 9.65692 7.02325C9.43479 6.71194 9.12378 6.48959 8.77273 6.39111M7.13636 1.05778C7.48835 1.15569 7.80033 1.37809 8.02313 1.68992C8.24592 2.00174 8.36685 2.38526 8.36685 2.78C8.36685 3.17474 8.24592 3.55826 8.02313 3.87008C7.80033 4.18191 7.48835 4.40431 7.13636 4.50222M5.90909 2.77778C5.90909 3.75962 5.17647 4.55556 4.27273 4.55556C3.36899 4.55556 2.63636 3.75962 2.63636 2.77778C2.63636 1.79594 3.36899 1 4.27273 1C5.17647 1 5.90909 1.79594 5.90909 2.77778Z"
      stroke="#A5A4A4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StageIcon = () => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.83333 5.66667C6.189 5.66667 5.66667 6.189 5.66667 6.83333C5.66667 7.47767 6.189 8 6.83333 8C7.47767 8 8 7.47767 8 6.83333C8 6.189 7.47767 5.66667 6.83333 5.66667ZM6.83333 5.66667V2.94444C6.83333 2.73816 6.75139 2.54033 6.60553 2.39447C6.45967 2.24861 6.26184 2.16667 6.05556 2.16667H4.88889M2.16667 3.33333C2.811 3.33333 3.33333 2.811 3.33333 2.16667C3.33333 1.52233 2.811 1 2.16667 1C1.52233 1 1 1.52233 1 2.16667C1 2.811 1.52233 3.33333 2.16667 3.33333ZM2.16667 3.33333V8"
      stroke="#A5A4A4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckMark = ({ fill }) => (
  <svg
    width="12"
    height="9"
    viewBox="0 0 12 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="KanbanFilter__select "
  >
    <path
      d="M4.19998 8.40003C4.04083 8.40003 3.88827 8.33688 3.77577 8.22438L0.175727 4.62418C-0.0585757 4.38988 -0.0585757 4.01008 0.175727 3.77577C0.41003 3.54147 0.789985 3.54147 1.02414 3.77577L4.19998 6.95161L10.9759 0.175727C11.2102 -0.0585757 11.5901 -0.0585757 11.8243 0.175727C12.0586 0.41003 12.0586 0.789985 11.8243 1.02429L4.62418 8.22438C4.51168 8.33688 4.35913 8.40003 4.19998 8.40003Z"
      fill={fill}
    />
  </svg>
);

CheckMark.propTypes = {
  fill: PropTypes.string,
};
CheckMark.defaultProps = {
  fill: "",
};

const KanbanFilter = ({
  match,
  addAppFilter,
  addUserFilter,
  removeAppFilter,
  removeUserFilter,
  appFilter,
  userFilter,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const apps = useSelector((state) => state.modules.app);
  const softwareDevs = AppUtils.getProjectTeamByRole(
    APP_ROLES.SOFTWARE_DEVELOPER,
  );
  return (
    <Dropdown
      className="KanbanFilter"
      direction="right"
      isOpen={dropdownOpen}
      toggle={toggle}
    >
      <DropdownToggle tag="a" className="font-8 KanbanFilter__toggle">
        •••
      </DropdownToggle>
      <DropdownMenu
        className="KanbanFilter__menu px-3 py-2"
        positionFixed
        right
      >
        <div className="KanbanFilter__header border-bottom py-2">Filter</div>
        <div className="KanbanFilter__user py-2 border-bottom">
          <div className="d-flex align-items-center">
            {/* <UserIcon /> */}
            <span className="font-10 KanbanFilter__header">User</span>
          </div>
          <div className="KanbanFilter__users">
            {softwareDevs.map((dev, index) => (
              <div
                key={index}
                className={`d-flex align-items-center justify-content-between py-1 KanbanFilter__option ${
                  userFilter.includes(dev._id) ? "active" : ""
                }`}
                onClick={() => (userFilter.includes(dev._id)
                  ? removeUserFilter(dev._id)
                  : addUserFilter(dev._id))}
              >
                <div className="d-flex align-items-center">
                  <AvatarSingle item={dev} className="KanbanFilter__avatar" />
                  <span className="font-12 ml-2">{dev.user.name}</span>
                </div>
                <CheckMark
                  fill={
                    userFilter.includes(dev._id)
                      ? `${colors.ZEEDAS_GREEN}`
                      : "rgba(3, 42, 63, 0.2)"
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="KanbanFilter__app py-2">
          <div className="d-flex align-items-center">
            {/* <StageIcon /> */}
            <span className="font-10 KanbanFilter__header">App</span>
          </div>
          {
            apps && apps.data
              ? (
                <div className="KanbanFilter__apps">
                  {apps.data.map((app, index) => (
                    <div
                      key={index}
                      className={`d-flex align-items-center justify-content-between KanbanFilter__option ${
                        appFilter.includes(app._id) ? "active" : ""
                      }`}
                      onClick={() => (appFilter.includes(app._id)
                        ? removeAppFilter(app._id)
                        : addAppFilter(app._id))}
                    >
                      <div className="d-flex align-items-center py-1">
                        <img
                          src={app.icon}
                          alt="app-icon"
                          height="12px"
                          className="app-icon"
                        />
                        <span className="font-12 ml-2">{app.name}</span>
                      </div>
                      <CheckMark
                        fill={
                    appFilter.includes(app._id)
                      ? `${colors.ZEEDAS_GREEN}`
                      : "rgba(3, 42, 63, 0.2)"
                  }
                      />
                    </div>
                  ))}
                </div>
              )

              : <></>
          }
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default withRouter(KanbanFilter);
