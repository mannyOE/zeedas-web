import React from "react";
import "./style.scss";
// import PropTypes from "prop-types";
import { Row, Col, Progress } from "reactstrap";
import ZeedasBadge from "zeedas-components/badge";
import colors from "utils/colors";
import Card from "zeedas-components/card";
import BadgeBIcon from "zeedas-assets/icons/icon-badge-b";
import BadgeCIcon from "zeedas-assets/icons/icon-badge-c";
import BadgeDIcon from "zeedas-assets/icons/icon-badge-d";
import { AppUtils } from "utils/app-utils";
import PropTypes from "prop-types";

import AccountAvatar from "pages/users/user-profile/_components/account-avatar";
import ContactDetails from "../contact-details";

const ProfileDetails = ({ profileData, className }) => (
  <div className={`profile-bio ${className}`}>
    <Card className="p-0 ProfileDetails__card">
      <div className="text-center px-3 pb-3">
        <div className="p-3">
          <AccountAvatar
            source={profileData.user.avatar}
            backgroundColor={profileData.user.avatarColor}
            name={profileData.user.name}
            dimension={84}
            borderRadius={42}
            fontSize={20}
          />

          <h2 className="profile-name mt-2">{profileData.user.name}</h2>
          {profileData.roles.map((role) => (
            <ZeedasBadge
              color={colors.ZEEDAS_BLUE}
              backgroundColor={colors.ZEEDAS_FADED_BLUE}
            >
              {AppUtils.interpretRole(role)}
            </ZeedasBadge>
          ))}

          <div className="mt-4 progress-counter-bar px-2">
            <div className="progress-percent text-right">0%</div>
            <Progress value="0" color="zd-green" />
          </div>

          <div className="mt-4 d-flex justify-content-around progress-counter-container">
            <div className="text-center">
              <p className="font-bold mb-0 progress-counter-value">0</p>
              <small className="progress-counter-label small">Completed</small>
            </div>
            <div className="text-center">
              <p className="font-bold mb-0 progress-counter-value">0</p>
              <small className="progress-counter-label small">
                In progress
              </small>
            </div>
            <div className="text-center">
              <p className="font-bold mb-0 progress-counter-value">0</p>
              <small className="progress-counter-label small">Overdue</small>
            </div>
          </div>
        </div>
      </div>

      <hr className="m-0" />
      <div className="contact-details p-3">
        <ContactDetails
          className="px-3 py-1"
          phoneNumber={profileData.user.phone}
          email={profileData.user.email}
        />
      </div>
      <hr />

      <div className="d-flex justify-content-around performance-circles-container p-3">
        <div className="performance-circle">
          <BadgeBIcon />
        </div>
        <div className="performance-circle">
          <BadgeCIcon />
        </div>
        <div className="performance-circle">
          <BadgeDIcon />
        </div>
        <div className="performance-circle">
          <BadgeBIcon />
        </div>
      </div>
    </Card>
  </div>
);

ProfileDetails.defaultProps = {
  className: "",
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
