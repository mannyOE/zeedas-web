import React, { useState } from "react";
import moment from "moment";
import "./style.scss";
import { ClockIcon } from "zeedas-assets/icons/icon-clock";
import IconBellFilled from "zeedas-assets/icons/icon-bell-filled";
import { useSelector } from "react-redux";
import AvatarSingle from "zeedas-components/avatar-single";
import { Link, withRouter } from "react-router-dom";

const clockIconProps = {
  dimension: {
    width: 10.08,
    height: 10.08,
  },
  color: "rgba(3, 41, 61, 0.5)",
  strokeWidth: 1.4,
};

const ModuleNotification = ({ className }) => (
  <div
    className={`ModuleNotification d-inline-block position-relative ${className}`}
  >
    <IconBellFilled />
    <span className="ModuleNotification__count font-6" />
  </div>
);

const ModuleCard = ({
  className,
  module,
  onClick,
  active,
  cardDropdown,
  showNotification,
  history,
}) => {
  const project = useSelector((state) => state.projects.single_project);
  const allNotifications = useSelector((state) => state.notification.allNotifications);
  const unreadNotification = allNotifications.some((singleNotification) => (
    singleNotification.module === module._id && !singleNotification.seen
  ));

  const goToProfile = (event) => {
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    history.push(`/team-member-profile/${softwareDev.user._id}`);
  };

  let softwareDev = null;
  if (module.sd) { softwareDev = project.users.find((user) => user._id === module.sd); }

  return (
    <div
      onClick={() => onClick()}
      className={`ModuleCard d-block p-3 ${className} ${active ? "active" : ""
      }`}
    >
      <div className="row align-items-start no-gutters mb-3">
        <div className="col-md-9 pr-2">
          <div className="ModuleCard__name font-10">{module.name}</div>
        </div>
        <div className="col-md-3 d-flex align-items-start justify-content-end">
          {/*{showNotification && <ModuleNotification className="mr-2" />}*/}
          {unreadNotification && <ModuleNotification className="mr-2" />}
          {cardDropdown}
        </div>
      </div>
      <div className="row">
        <div className="col-md-10">
          <div className="d-flex align-items-center">
            <ClockIcon {...clockIconProps} />
            <span className="ModuleCard__duedate font-10 ml-1">
              {module.dueDate
                ? `Due ${moment(module.dueDate).format("ddd, DD MMM")}`
                : "--"}
            </span>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          {softwareDev && (
            <a onClick={goToProfile} style={{ cursor: "pointer" }}>
              <AvatarSingle item={softwareDev} className="ModuleCard__avatar" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ModuleCard);
