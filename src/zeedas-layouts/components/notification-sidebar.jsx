import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { APP_ROLES } from "../../utils/constants";

// import bellicon from "../../zeedas-assets/images/topbar-icons/bell-icon.svg";
import { ReactComponent as BellIcon } from "../../zeedas-assets/images/topbar-icons/bell-icon.svg";
import { firebaseActions } from "../../services/firebase";

const NotificationSidebar = (props) => {
  const {
    $notification,
    $user,
    onSelectNotification,
  } = props;

  const { token, newNotification, allNotifications } = $notification;

  const urlRoleSelector = (role) => (role === APP_ROLES.QUALITY_ASSURANCE ? "test" : "modules");
  const notificationUrlSelector = (notification) => (
    `/project/${notification.project}/${urlRoleSelector(notification.role)}/${notification.role}/${notification.module}`
  );

  const onNotificationClick = (event, notification) => {
    if (notification.role === APP_ROLES.SOFTWARE_DEVELOPER || !notification.role) {
      event.preventDefault();
    }

    if (!allNotifications.length) {
      return false;
    }

    const moduleNotifications = allNotifications.filter((singleNotification) => (
      singleNotification.module === notification.module
    ));

    moduleNotifications.forEach((singleNotification) => {
      const notificationPayload = { ...singleNotification };
      delete notificationPayload.snapshotKey;
      firebaseActions.markNotificationAsSeen($user._id, singleNotification.snapshotKey, notificationPayload);
    });

    // const notificationPayload = { ...notification };
    // delete notificationPayload.snapshotKey;
    // firebaseActions.markNotificationAsSeen($user._id, notification.snapshotKey, notificationPayload);

    onSelectNotification();
  };

  return (
    <div className="ViewModule 100-vh flex-column pl-4 pr-4 notification-parent">
      <div className="ViewModule__header d-flex justify-content-between align-items-center pb-3 px-5 pt-4">
        <h2 className="font-24 font-medium">Notifications</h2>
        {/* {isFetching && <span className="loading-status">Saving...</span>} */}
      </div>
      {/* <div className="h-100">
                  <div className="ViewModule__Tabs px-5">
                      <div className="ViewModule__Tabs-header d-flex">

                      </div>
                      <div className="ViewModule__Tab-content">

                      </div>
                  </div>
              </div> */}

      <div className="">
        { allNotifications && allNotifications.length
          ? allNotifications.map((notification) => (
            <Link
              to={notificationUrlSelector(notification)}
              onClick={(e) => onNotificationClick(e, notification)}
              >
              <div className="notification-entry bell-icon__info pt-5 ">
                <div
                  className={
                    `d-flex align-items-center justify-content-center bell__parent
                    bell__parent--${notification.seen ? "opened" : "unopened"}`
                  }
                >
                  <BellIcon className={`notification-entry__icon--${notification.seen ? "opened" : "unopened"}`} />
                </div>
                <div className="row d-flex ml-4 notification-info justify-content-between pb-3">
                  <p
                    className={`col-9 font-16 mb-0 ${!notification.seen ? "font-weight-bold" : ""}`}
                    style={{
                      color: "#03293D",
                    }}
                  >
                    {/*{ notification.data.body || "New Activity" }*/}
                    { notification.content }
                  </p>
                  <p
                    className="col-3 align-self-end"
                    style={{
                      color: "#03293D",
                      opacity: "0.5",
                    }}
                  >
                    { moment(new Date(notification.date)).fromNow() }
                  </p>
                </div>
              </div>
            </Link>
          )) : (
            <div className="bell-icon__info pt-5 ">
              <div className="d-flex align-items-center justify-content-center bell__parent">
                <BellIcon className="`notification-entry__icon--opened" />
              </div>
              <div className="d-flex ml-4 notification-info justify-content-between pb-3">
                <p className="font-16 mb-0">There are no notifications to display.</p>
              </div>
            </div>
          )
        }
      </div>
  {/*    <div className="">
        <div className="bell-icon__info pt-5 ">
          <div className="d-flex align-items-center justify-content-center bell__parent">
            <img src={bellicon} />
          </div>
          <div className="d-flex ml-4 notification-info justify-content-between pb-3">
            <p className="font-16 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <p className="align-self-end">10/10/2020</p>
          </div>
        </div>
        <div className="bell-icon__info pt-5 ">
          <div className="d-flex align-items-center justify-content-center bell__parent">
            <img src={bellicon} />
          </div>
          <div className="d-flex ml-4 notification-info justify-content-between pb-3">
            <p className="font-16 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <p className="align-self-end">10/10/2020</p>
          </div>
        </div>
        <div className="bell-icon__info pt-5 ">
          <div className="d-flex align-items-center justify-content-center bell__parent">
            <img src={bellicon} />
          </div>
          <div className="d-flex ml-4 notification-info justify-content-between pb-3">
            <p className="font-16 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <p className="align-self-end">10/10/2020</p>
          </div>
        </div>
        <div className="bell-icon__info pt-5 ">
          <div className="d-flex align-items-center justify-content-center bell__parent">
            <img src={bellicon} />
          </div>
          <div className="d-flex ml-4 notification-info justify-content-between pb-3">
            <p className="font-16 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <p className="align-self-end">10/10/2020</p>
          </div>
        </div>
        <div className="bell-icon__info pt-5 ">
          <div className="d-flex align-items-center justify-content-center bell__parent">
            <img src={bellicon} />
          </div>
          <div className="d-flex ml-4 notification-info justify-content-between pb-3">
            <p className="font-16 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <p className="align-self-end">10/10/2020</p>
          </div>
        </div>
        <div className="bell-icon__info pt-5 ">
          <div className="d-flex align-items-center justify-content-center bell__parent">
            <img src={bellicon} />
          </div>
          <div className="d-flex ml-4 notification-info justify-content-between pb-3">
            <p className="font-16 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <p className="align-self-end">10/10/2020</p>
          </div>
        </div>
      </div>*/}
    </div>
  )
};

const mapState = (state) => ({
  $notification: state.notification,
  $user: state.auth.userData,
});

export default connect(mapState)(NotificationSidebar);
