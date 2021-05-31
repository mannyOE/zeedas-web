import React from 'react';
import { DropdownMenu, DropdownItem } from 'reactstrap';
import LogoutIcon from '../../zeedas-assets/icons/icon-logout';
import RightCaretIcon from '../../zeedas-assets/icons/icon-caret-right';
import ProfileSettingsIcon from '../../zeedas-assets/icons/icon-profile-settings';
import ChangePasswordIcon from '../../zeedas-assets/icons/icon-change-password';
import SettingsIcon from '../../zeedas-assets/icons/icon-settings';
import AccountAvatar from '../../pages/users/user-profile/_components/account-avatar';
import { AppUtils } from '../../utils/app-utils';
import { APP_ROLES } from '../../utils/constants';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ userData, logUserOut }) => {
  return (
    <div className="profile-dropdown">
      <DropdownMenu right>
        <div className="company-details d-flex justify-content-between align-items-center border-bottom">
          <AccountAvatar
            source={userData.account.avatar}
            backgroundColor={userData.avatarColor}
            name={userData.account.companyName}
            dimension={44}
            borderRadius={22}
            fontSize={12}
          />
          <div>
            <p className="company-name">{userData.account.companyName}</p>
            {/* <p className="company-link">company-url.com</p> */}
          </div>
          <RightCaretIcon />
        </div>
        <DropdownItem
          className="dropdown-item"
          tag={Link}
          to="/user-profile/profile-update"
        >
          <ProfileSettingsIcon />
          <span className="item-text">Profile Settings</span>
        </DropdownItem>
        <DropdownItem
          tag={Link}
          className="dropdown-item"
          to="/user-profile/change-password"
        >
          <ChangePasswordIcon />
          <span className="item-text">Change Password</span>
        </DropdownItem>
        {AppUtils.getCurrentUserRole() === APP_ROLES.OWNER && (
          <DropdownItem
            tag={Link}
            className="dropdown-item"
            to="/user-profile/team-profile"
          >
            <SettingsIcon />
            <span className="item-text">Settings</span>
          </DropdownItem>
        )}
        <DropdownItem onClick={logUserOut} className="dropdown-item">
          <LogoutIcon />
          <span className="item-text item-text-red">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
