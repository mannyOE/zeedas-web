import React from "react";
import { connect, useSelector } from "react-redux";
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import SingleProjectMenu from "pages/projects/_components/single-project-menu/index";
import ZeedasBadge from "../../zeedas-components/badge";
import Colors from "../../utils/colors";
/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import zeedaslogo from "../../zeedas-assets/images/logos/zeedas-sidebar-logo.svg";
import sidebarnavigationicon from "../../zeedas-assets/images/nav-icons/sidebar-icon.svg";
import zeedaslogomini from "../../zeedas-assets/images/logos/zeedas-sidebar-logo-mini.svg";
import notificationsicon from "../../zeedas-assets/images/topbar-icons/notifications.svg";
import noNotificationsIcon from "../../zeedas-assets/images/topbar-icons/notification-no-new.svg";
import shieldicon from "../../zeedas-assets/images/topbar-icons/shield.svg";
import dropdownicon from "../../zeedas-assets/images/topbar-icons/chevron-down.svg";
import IconPlusList from "../../zeedas-assets/icons/icon-plus-list";
import ProfileDropdown from "./profile-dropdown";
import SearchLayout from "./search-layout/index";
import SearchIcon from "../../zeedas-assets/icons/icon-search";
import ZeedasFullModal from "../../zeedas-components/full-modal";
import CreateTodo from "../../pages/project/_components/todo";
import { AppUtils } from "../../utils/app-utils";
import AccountAvatar from "../../pages/users/user-profile/_components/account-avatar";
import { authActions } from "../../state/redux/auth/actions";
import { clearNotificationToken, clearNewNotifications, clearNotifications } from "../../state/redux/notification/action";
import NotificationSidebar from "./notification-sidebar";

const PageTitle = () => {
  const pageTitle = useSelector((state) => state.header.pageTitle);
  const project = useSelector((state) => state.projects.single_project);
  if (pageTitle.project) {
    const menuToggleComponent = (
      <div className="d-none d-md-flex">
        <img
          src={project.icon}
          alt=""
          width="21px"
          className="mx-2"
        />
        <h2
          style={{
            whiteSpace: "nowrap",
            flexGrow: 1,
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          className="ml-2 page-title bold"
        >
          {project.name}
        </h2>
      </div>
    );
    return <SingleProjectMenu menuToggleComponent={menuToggleComponent} />;
  }
  return <h2 className="d-none d-md-block page-title bold">{pageTitle}</h2>;
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.showMobilemenu = this.showMobilemenu.bind(this);
    this.sidebarHandler = this.sidebarHandler.bind(this);
    this.state = {
      isOpen: false,
      collapse: false,
      displayModal: false,
    };
  }

  /*--------------------------------------------------------------------------------*/
  /* To open NAVBAR in MOBILE VIEW                                                  */
  /*--------------------------------------------------------------------------------*/
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  toggleSideNotification = () => {
    // console.log("CLICKER!!!");
    this.props.dispatch(clearNewNotifications());
    this.setState((prevState) => ({ displayModal: !prevState.displayModal }));
  };

  /*--------------------------------------------------------------------------------*/
  /* To open SIDEBAR-MENU in MOBILE VIEW                                             */
  /*--------------------------------------------------------------------------------*/
  showMobilemenu() {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  }

  sidebarHandler = () => {
    const element = document.getElementById("main-wrapper");
    switch (this.props.settings.activeSidebarType) {
      case "full":
      case "iconbar":
        element.classList.toggle("mini-sidebar");
        if (element.classList.contains("mini-sidebar")) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
        } else {
          element.setAttribute(
            "data-sidebartype",
            this.props.settings.activeSidebarType,
          );
        }
        break;

      case "overlay":
      case "mini-sidebar":
        element.classList.toggle("full");
        if (element.classList.contains("full")) {
          element.setAttribute("data-sidebartype", "full");
        } else {
          element.setAttribute(
            "data-sidebartype",
            this.props.settings.activeSidebarType,
          );
        }
        break;
      default:
    }
  };

  logUserOut = async () => {
    this.props.dispatch(authActions.logout());
    this.props.dispatch(clearNotificationToken());
    this.props.dispatch(clearNotifications());
  };

  render() {
    const { displayModal } = this.state;
    const { allNotifications } = this.props.notification;
    const unopenedNotificationsCount = allNotifications
      .filter((singleNotification) => !singleNotification.seen).length || 0;

    return (
      <header
        className="topbar navbarbg"
        data-navbarbg={this.props.settings.activeNavbarBg}
      >
        <Navbar
          className={`top-navbar ${
            this.props.settings.activeNavbarBg === "skin2"
              ? "navbar-light"
              : "navbar-dark"
          }`}
          expand="md"
        >
          <div
            className="navbar-header"
            id="logobg"
            data-logobg={this.props.settings.activeLogoBg}
          >
            {/*--------------------------------------------------------------------------------*/}
            {/* Mobile View Toggler  [visible only after 768px screen]                         */}
            {/*--------------------------------------------------------------------------------*/}
            <span
              className="nav-toggler d-block d-md-none"
              onClick={this.showMobilemenu}
            >
              <i className="ti-menu ti-close" />
            </span>
            {/*--------------------------------------------------------------------------------*/}
            {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
            {/*--------------------------------------------------------------------------------*/}
            <NavbarBrand style={{ paddingLeft: "25px" }} href="/">
              <b className="logo-icon">
                {/* <img src={zeedaslogo} alt="homepage" className="dark-logo" /> */}
                <img
                  src={zeedaslogomini}
                  alt="homepage"
                  className="light-logo"
                />
              </b>
              <span className="logo-text">
                {/* <img src={zeedaslogomini} alt="homepage" className="dark-logo" /> */}
                <img src={zeedaslogo} className="light-logo" alt="homepage" />
              </span>
            </NavbarBrand>
            {/*--------------------------------------------------------------------------------*/}
            {/* Mobile View Toggler  [visible only after 768px screen]                         */}
            {/*--------------------------------------------------------------------------------*/}
            <span
              className="topbartoggler d-block d-md-none"
              onClick={this.toggle}
            >
              <i className="ti-more" />
            </span>
          </div>
          <Collapse
            className="navbarbg"
            isOpen={this.state.isOpen}
            navbar
            data-navbarbg={this.props.settings.activeNavbarBg}
          >
            <Nav className="float-left" style={{ paddingLeft: "25px" }} navbar>
              <NavItem>
                <NavLink
                  href="#"
                  className="d-none d-md-block"
                  onClick={this.sidebarHandler}
                >
                  <img
                    src={sidebarnavigationicon}
                    alt="sidebar-navigation-icon"
                  />
                </NavLink>
              </NavItem>
            </Nav>
            <Nav>
              <NavItem>
                <PageTitle />
              </NavItem>
            </Nav>
            <Nav>
              <NavItem>
                <SearchLayout />
              </NavItem>
            </Nav>

            <Nav className="topbar-right-section ml-auto float-right" navbar>
              {/*--------------------------------------------------------------------------------*/}
              {/* Start Notifications Dropdown                                                   */}
              {/*--------------------------------------------------------------------------------*/}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret onClick={this.toggleSideNotification}>
                  { unopenedNotificationsCount > 0 && (
                    <div className="notification-count">
                      { unopenedNotificationsCount }
                    </div>
                  )}
                  <img
                    // src={unopenedNotificationCount ? notificationsicon : noNotificationsIcon}
                    src={noNotificationsIcon}
                    alt="notifications"
                    // onClick={this.toggleSideNotification}
                  />
                </DropdownToggle>
                {/* <DropdownMenu right className="mailbox">
                  <div className="d-flex no-block align-items-center p-3 border-bottom">
                    <h4 className="mb-0">0 New Notifications</h4>
                  </div>
                  <div className="message-center notifications"> */}
                {/* <!-- Message --> */}
                {/* {data.notifications.map((notification, index) => {
                                            return (
                                                <span href="" className="message-item" key={index}>
                                                    <span className={"btn btn-circle btn-" + notification.iconbg}>
                                                        <i className={notification.iconclass} />
                                                    </span>
                                                    <div className="mail-contnet">
                                                        <h5 className="message-title">{notification.title}</h5>
                                                        <span className="mail-desc">
                                                            {notification.desc}
                                                        </span>
                                                        <span className="time">{notification.time}</span>
                                                    </div>
                                                </span>
                                            );
                                        })} */}
                {/* </div> */}
                {/* <a className="nav-link text-center mb-1 text-dark" href=";">
                                        <strong>Check all notifications</strong>{' '}
                                        <i className="fa fa-angle-right" />
                                    </a> */}
                {/* </DropdownMenu> */}
              </UncontrolledDropdown>
              {/*--------------------------------------------------------------------------------*/}
              {/* End Notifications Dropdown                                                     */}
              {/*--------------------------------------------------------------------------------*/}
              {/*--------------------------------------------------------------------------------*/}

              <NavItem className="font-bold d-none d-md-block m-4">
                <ZeedasBadge
                  color={Colors.ZEEDAS_WHITE}
                  backgroundColor={Colors.ZEEDAS_BLUE}
                >
                  <span className="font-bold">
                    <img
                      className="badge-shield"
                      src={shieldicon}
                      alt="shield"
                    />
                    {AppUtils.getCurrentUserRole()
                      && AppUtils.interpretRole(AppUtils.getCurrentUserRole())}
                  </span>
                </ZeedasBadge>
              </NavItem>

              {/* TODO: Add Performance Badge */}

              {/*--------------------------------------------------------------------------------*/}
              {/* Start Profile Dropdown                                                         */}
              {/*--------------------------------------------------------------------------------*/}

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="d-flex profile-nav-item">
                  <div className="d-flex no-block align-items-center">
                    <AccountAvatar
                      // TODO: Properly resolve prop defaults - MEL
                      source={this.props.users.accountInfo.user.avatar || ""}
                      backgroundColor={
                        this.props.users.accountInfo.user.avatarColor || ""
                      }
                      name={this.props.users.accountInfo.user.name || ""}
                      dimension={40}
                      borderRadius={20}
                      fontSize={12}
                    />
                    {/* <div className="">
                      <img
                        src={ladyphoto}
                        alt="user"
                        className="rounded-circle"
                        width="40"
                      />

                    </div> */}
                    <div className="ml-2">
                      <h4 className="profile-name mb-0">
                        {this.props.users.accountInfo.user.name}
                      </h4>
                      <h6
                        style={{ color: Colors.ZEEDAS_BLUE }}
                        className="profile-email mb-0"
                      >
                        {this.props.users.accountInfo.user.email}
                      </h6>
                    </div>
                    <img
                      className="ml-4"
                      src={dropdownicon}
                      alt="droppdown"
                      width="20"
                    />
                  </div>
                </DropdownToggle>
                <ProfileDropdown
                  userData={this.props.users.accountInfo.user}
                  logUserOut={this.logUserOut}
                />
              </UncontrolledDropdown>
              {/*--------------------------------------------------------------------------------*/}
              {/* End Profile Dropdown                                                           */}
              {/*--------------------------------------------------------------------------------*/}
            </Nav>
          </Collapse>
        </Navbar>
        {displayModal && (
          <ZeedasFullModal
            open={displayModal}
            onClose={() => this.setState({ displayModal: false })}
            removeDefaultPadding
            width={
              window.innerWidth >= 768
                ? "45%"
                : window.innerWidth < 600
                  ? "100%"
                  : "33%"
            }
          >
            <NotificationSidebar onSelectNotification={() => this.setState({ displayModal: false })} />
          </ZeedasFullModal>
        )}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Header);
