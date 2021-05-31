import React from 'react';
import { connect } from 'react-redux';
import { Switch, NavLink, Redirect } from 'react-router-dom';
import { Col, Row, Nav } from 'reactstrap';
import CardComponent from '../../../zeedas-components/card';
import ProfileUpdates from './profile-updates/index';
import ChangePassword from './change-password/index';
import TeamProfile from './team-profile/index';
import { APP_ROLES } from '../../../utils/constants';
import { AuthenticatedRoute } from '../../../zeedas-routes/authenticated-routes-hoc';
import { fetchCountryList } from 'state/redux/shared/actions';

const userProfileRoutes = [
  {
    path: '/user-profile/profile-update',
    name: 'Profile Updates',
    description: 'Updates and edit your profile information',
    component: ProfileUpdates,
  },
  {
    path: '/user-profile/change-password',
    name: 'Change Password',
    description: 'Try and remember your new password',
    component: ChangePassword,
  },
  {
    path: '/user-profile/team-profile',
    name: 'Team Profile',
    description: 'Updates and edit your team information',
    authorisedRoles: [APP_ROLES.OWNER],
    component: TeamProfile,
  },
];

const mapStateToProps = (state) => ({
  ...state,
});

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    this.props.fetchCountryList()
  };

  activeProfileRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1
      ? 'selected'
      : '';
  }

  render() {
    return (
      <div className="container user-profile">
        <Row>
          <Col md="4">
            <CardComponent
              style={{
                background: '#FCFCFC',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.03)',
                borderRadius: 0,
                borderRight: '1px solid rgba(45, 45, 45, 0.1)',
                height: '100%',
              }}
            >
              <div className="profile-sidebar">
                <p className="profile-sidebar-title">Profile</p>
                <Nav className="profile-sidebar-navigation">
                  {userProfileRoutes.map((route, index) => {
                    if (route.redirect) {
                      return null;
                    }
                    if (
                      route.authorisedRoles &&
                      route.authorisedRoles.indexOf(
                        this.props.users.accountInfo.membershipInfo.roles[0]
                      )
                    ) {
                      return null;
                    }
                    return (
                      <li
                        className={`${this.activeProfileRoute(
                          route.path
                        )} w-100`}
                      >
                        <NavLink to={route.path}>
                          <p className="profile-sidebar-item-title">
                            {route.name}
                          </p>
                          <p className="profile-sidebar-item-description">
                            {route.description}
                          </p>
                        </NavLink>
                        {index !== userProfileRoutes.length - 1 && <hr />}
                      </li>
                    );
                  })}
                </Nav>
              </div>
            </CardComponent>
          </Col>
          <Col md="8" className="justify-content-center h-100">
            <Switch>
              {userProfileRoutes.map((route, key) => {
                if (route.redirect) {
                  return (
                    <Redirect from={route.path} to={route.pathTo} key={key} />
                  );
                }
                return (
                  <AuthenticatedRoute
                    path={route.path}
                    component={route.component}
                    key={key}
                  />
                );
              })}
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, { fetchCountryList })(UserProfile);
