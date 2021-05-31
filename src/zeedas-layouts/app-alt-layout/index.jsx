import React from "react";
import "./style.scss";
import { Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import LargeSlantBars from "../../zeedas-assets/images/sidebar/slant-bars.svg";
import InviteTeamMembers from "../../pages/users/invite-team-members/index";
import MiniLeftSection from "../components/mini-left-section";
import PersonalAccountSetup from "../../pages/users/setup-personal-account/index";
import { AuthenticatedRoute } from "../../zeedas-routes/authenticated-routes-hoc";
import { APP_ROLES } from "../../utils/constants";
import { accountSetupRoutes } from "../../zeedas-routes/index-routes";
// import SlantBars from '../zeedas-assets/images/sidebar/slant-bars.svg';

class AppAlternativeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      accountInfo,
      completedAccountSetup,
      completedSetupInvites,
    } = this.props.$users;
    return (
      <div className="AppAlternativeLayout">
        <div className="row no-gutters">
          <div className="col-md-2">
            <aside className="">
              <MiniLeftSection />
            </aside>
          </div>
          <div className="col-md-10">
            <section className="AppAlternativeLayout__content ">
              <img src={LargeSlantBars} alt="background" className="bg-img" />
              <div className="container d-flex justify-content-center">
                <Switch>
                  {accountSetupRoutes.map((prop, key) => {
                    if (prop.redirect) {
                      return (
                        <Redirect from={prop.path} to={prop.pathTo} key={key} />
                      );
                    }

                    if (accountInfo) {
                      if (prop.path === "/account-setup/setup-personal-account" && completedAccountSetup) {
                        return (
                          <Redirect
                            from={prop.path}
                            to="/account-setup/invite-team-members"
                            key={key}
                          />
                        );
                      }

                      if (prop.path === "/account-setup/invite-team-members" && completedSetupInvites) {
                        return (
                          <Redirect
                            from={prop.path}
                            to="/projects"
                            key={key}
                          />
                        );
                      }
                    }

                    return (
                      <AuthenticatedRoute
                        path={prop.path}
                        component={prop.component}
                        key={key}
                      />
                    );
                  })}

                  <Route
                    render={(props) => (
                      <Redirect to="/account-setup/setup-personal-account" />
                    )}
                  />
                </Switch>
              </div>
            </section>
          </div>
        </div>
        {/* <Row>
            <Col md="2" className="alt-left-side d-flex flex-column">
              <MiniLeftSection />
            </Col>
            <Col md="10" className="alt-right-side d-flex flex-column">
              <Switch>
                {accountSetupRoutes.map((prop, key) => {
                  if (prop.redirect) {
                    return (
                      <Redirect from={prop.path} to={prop.pathTo} key={key} />
                    );
                  }
                  return (
                    <AuthenticatedRoute
                      path={prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                })}
              </Switch>
            </Col>
          </Row> */}
        {/* <img src={SlantBars} alt="background" className="slant-bars" /> */}
      </div>
    );
  }
}

const mapState = (state) => ({
  $users: state.users,
});

export default connect(mapState)(AppAlternativeLayout);
