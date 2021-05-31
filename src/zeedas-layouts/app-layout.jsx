import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { usersActions } from "state/redux/users/actions";
import { setNotificationToken } from "state/redux/notification/action";
import { AppRoutes, OtherRoutes } from "../zeedas-routes/router";
import TeamRoutes from "../zeedas-routes/team-routes";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import AddTeamMembersModal from "../pages/users/teams/_components/add-team-members-modal";
import AuthenticatedRoute from "../zeedas-routes/authenticated-routes-hoc";
import ReferAFriendModal from "./components/refer-a-friend/index";
import { firebaseActions } from "../services/firebase";
import {AppUtils} from "../utils/app-utils";
import {APP_ROLES} from "../utils/constants";
import DesktopAppDownload from "../pages/authentication/desktop-app-download";
import AuthPageLayout from "./components/AuthPageLayout";

const mapStateToProps = (state) => ({
  ...state,
});

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      isOpen: false,
      width: window.innerWidth,
      pageTitle: "",
      openAddModal: false,
      openReferalModal: false,
    };

    this.props.history.listen((location, action) => {
      if (
        window.innerWidth < 767
        && document
          .getElementById("main-wrapper")
          .className.indexOf("show-sidebar") !== -1
      ) {
        document
          .getElementById("main-wrapper")
          .classList.toggle("show-sidebar");
      }
    });
  }

  /*--------------------------------------------------------------------------------*/
  /* Life Cycle Hook, Applies when loading or resizing App                           */
  /*--------------------------------------------------------------------------------*/
  componentDidMount() {
    firebaseActions.setupFirebase();

    window.addEventListener("load", this.updateDimensions);
    window.addEventListener("resize", this.updateDimensions);

    // this.props.dispatch(setPageTitle(pageTitle));
    this.props.dispatch(usersActions.fetchRoles());
    this.props.dispatch(usersActions.fetchTeamMembers());

    this.props.dispatch(usersActions.completedAccountSetup(true));
    this.props.dispatch(usersActions.completedSetupInvites(true));
  }

  /*--------------------------------------------------------------------------------*/
  /* Life Cycle Hook                                                                 */
  /*--------------------------------------------------------------------------------*/
  componentWillUnmount() {
    window.removeEventListener("load", this.updateDimensions);
    window.removeEventListener("resize", this.updateDimensions);
  }

  getPageTitle = (pathname) => {
    const routes = [...OtherRoutes, ...AppRoutes];
    const currentRoute = routes.find(
      (item) => pathname.indexOf(item.path) > -1,
    );
    return currentRoute.name;
    // this.setState({ pageTitle: currentRoute.name });
  };

  openAddTeamMembersModal = () => {
    this.setState({ openAddModal: true });
  };

  closeAddTeamMembersModal = () => {
    this.setState({ openAddModal: false });
  };

  openReferralModal = () => {
    this.setState({ openReferralModal: true });
  };

  closeReferralModal = () => {
    this.setState({ openReferralModal: false });
  };

  /*--------------------------------------------------------------------------------*/
  /* Function that handles sidebar, changes when resizing App                        */
  /*--------------------------------------------------------------------------------*/
  updateDimensions() {
    const element = document.getElementById("main-wrapper");
    this.setState({
      width: window.innerWidth,
    });
    switch (this.props.settings.activeSidebarType) {
      case "full":
      case "iconbar":
        if (this.state.width < 1170) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
          element.classList.add("mini-sidebar");
        } else {
          element.setAttribute(
            "data-sidebartype",
            this.props.settings.activeSidebarType,
          );
          element.classList.remove("mini-sidebar");
        }
        break;

      case "overlay":
        if (this.state.width < 767) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
        } else {
          element.setAttribute(
            "data-sidebartype",
            this.props.settings.activeSidebarType,
          );
        }
        break;

      default:
    }
  }

  render() {
    /*--------------------------------------------------------------------------------*/
    /* Theme Setting && Layout Options wiil be Change From Here                       */
    /*--------------------------------------------------------------------------------*/
    const userRoles = AppUtils.getCurrentUserRolesList();
    const userIsOnlySD = userRoles.length
      ? userRoles.every((role) => role === APP_ROLES.SOFTWARE_DEVELOPER)
      : false;

    if (userIsOnlySD) {
      return (
        <Switch>
          <Route
            path="/download-desktop-app"
            render={(props) => (
              <AuthPageLayout>
                <DesktopAppDownload {...props} />
              </AuthPageLayout>
            )}
          />

          <Route
            render={(props) => (
              <Redirect
                to="/download-desktop-app"
              />
            )}
          />
        </Switch>
      );
    }

    return (
      <div
        id="main-wrapper"
        dir={this.props.settings.activeDir}
        data-theme={this.props.settings.activeTheme}
        data-layout={this.props.settings.activeThemeLayout}
        data-sidebartype={this.props.settings.activeSidebarType}
        data-sidebar-position={this.props.settings.activeSidebarPos}
        data-header-position={this.props.settings.activeHeaderPos}
        data-boxed-layout={this.props.settings.activeLayout}
      >
        {/*--------------------------------------------------------------------------------*/}
        {/* Header and Sidebaar                                                            */}
        {/*--------------------------------------------------------------------------------*/}
        <Header pageTitle={this.state.pageTitle} />
        <Sidebar
          {...this.props}
          routes={AppRoutes}
          teamRoutes={TeamRoutes}
          openAddTeamMembersModal={() => this.openAddTeamMembersModal()}
          openReferralModal={() => this.openReferralModal()}
        />

        {/*--------------------------------------------------------------------------------*/}
        {/* Page Main-Content                                                              */}
        {/*--------------------------------------------------------------------------------*/}
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Switch>
              {OtherRoutes.map((prop, key) => (
                <AuthenticatedRoute
                  path={prop.path}
                  component={prop.component}
                  key={key}
                />
              ))}

              {AppRoutes.map((prop, key) => {
                if (prop.navlabel) {
                  return null;
                }
                if (prop.collapse) {
                  return prop.child.map((prop2, key2) => {
                    if (prop2.collapse) {
                      return prop2.subchild.map((prop3, key3) => (
                        <Route
                          path={prop3.path}
                          component={prop3.component}
                          key={key3}
                        />
                      ));
                    }
                    return (
                      <Route
                        path={prop2.path}
                        component={prop2.component}
                        key={key2}
                      />
                    );
                  });
                }
                if (prop.redirect) {
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                }
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
            </Switch>
          </div>
        </div>

        <AddTeamMembersModal
          open={this.state.openAddModal}
          onClose={this.closeAddTeamMembersModal}
        />
        <ReferAFriendModal
          open={this.state.openReferralModal}
          onClose={this.closeReferralModal}
        />
      </div>
    );
  }
}
export default connect(mapStateToProps)(AppLayout);
