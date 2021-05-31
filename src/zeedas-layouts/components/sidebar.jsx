import React from "react";
import { connect } from "react-redux";
import { Nav, Collapse, Button } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import AddIcon from "../../zeedas-assets/images/nav-icons/plus.svg";
import CollaborationImage from "../../zeedas-assets/images/sidebar/collaboration.svg";
import Colors from "../../utils/colors";
import AccountAvatar from "../../pages/users/user-profile/_components/account-avatar";

const mapStateToProps = (state) => ({
  ...state,
});

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.expandLogo = this.expandLogo.bind(this);
    this.state = {
      logoBg: null,
    };
  }

  componentDidMount() {
    this.setState({
      logoBg: document.querySelector("#logobg"),
    });
  }

  /*--------------------------------------------------------------------------------*/
  /* To Expand SITE_LOGO With Sidebar-Menu on Hover                                  */
  /*--------------------------------------------------------------------------------*/
  expandLogo = () => {
    // const logoBg = document.querySelector("#logobg");
    const { logoBg } = this.state;
    if (logoBg) {
      logoBg.classList.add("expand-logo");
    }
  }

  collapseLogo = () => {
    const { logoBg } = this.state;
    if (logoBg) {
      logoBg.classList.remove("expand-logo");
    }
  }

  /*--------------------------------------------------------------------------------*/
  /* Verifies if routeName is the one active (in browser input)                      */
  /*--------------------------------------------------------------------------------*/
  activeRoute = (routeName) => {

  // const name1 = routeName.split('/')[1].toLowerCase()
  // const name2 = this.props.header.pageTitle.toLowerCase()
  //   return name1 === name2
  //     ? 'selected'
  //     : '';
  }

  // Teams Navigation
  renderTeamNavigation = () => {
    // if (this.props.users.teamsList) {
    //   return <div className="text-center">No Team Member Yet</div>;
    // }
    // const confirmedTeam = this.props.users.teamsList.coreTeam.filter(
    //   (item) => item.user
    // );

    return (
      <Nav>
        <li
          className="nav-link d-flex justify-content-between flex-nowrap w-100"
          style={{ padding: "10px 25px 10px", color: Colors.ZEEDAS_WHITE }}
        >
          <span
            className="hide-menu"
            style={{
              opacity: "0.5",
              whiteSpace: "nowrap",
            }}
          >
            My Teams
          </span>
          <span
            style={{ cursor: "pointer", marginLeft: "10px" }}
            role="button"
            onClick={() => this.props.openAddTeamMembersModal()}
          >
            <img src={AddIcon} alt="plus-icon" />
          </span>
        </li>

        {!this.props.users.teamsList && (
          <div style={{ paddingLeft: "32px" }}>No team member yet</div>
        )}

        {this.props.users.teamsList
          && this.props.users.teamsList.coreTeam
            .filter((item) => item.user)
            .map((teamMember, index) => {
              if (index < 5) {
                return (
                  <li
                    className="sidebar-item"
                    key={teamMember.user._id}
                  >
                    <NavLink
                      style={{ padding: "10px 32px" }}
                      to={`/team-member-profile/${teamMember.user._id}`}
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      <span className="mr-2">
                        <AccountAvatar
                          source={teamMember.user.avatar}
                          backgroundColor={teamMember.user.avatarColor}
                          name={teamMember.user.name}
                          dimension={20}
                          borderRadius={10}
                          fontSize={8}
                        />
                      </span>
                      <span
                        // data-initials={AppUtils.getInitials(teamMember.user.name)}
                        className="hide-menu sidebar-team-member"
                      >
                        {teamMember.user.name}
                      </span>
                    </NavLink>
                  </li>
                );
              }
            })}
        <li
          className="nav-link"
          style={{ padding: "6px 32px 8px", color: Colors.ZEEDAS_WHITE }}
        >
          <Link
            to="/teams"
            className="hide-menu font-10"
            style={{ cursor: "pointer", whiteSpace: "nowrap" }}
          >
            See all team members
          </Link>
        </li>
      </Nav>
    );
  }

  // Sidebar Footer
  renderSidebarFooter = () => {
    return (
      <div className="sidebar-footer text-center hide-menu">
        <h4 className="invite-text" style={{ width: "188px" }}>
          Invite your team and start collaborating!
        </h4>
        <img
          className="invite-image"
          src={CollaborationImage}
          alt="collaboration"
        />

        <Button
          onClick={() => this.props.openReferralModal()}
          className="invite-button btn-outline-light"
        >
          Invite to Zeedas
        </Button>
      </div>
    );
  }

  render() {
    return (
      <aside
        className="left-sidebar"
        id="sidebarbg"
        data-sidebarbg={this.props.settings.activeSidebarBg}
        onMouseEnter={this.expandLogo}
        onMouseLeave={this.collapseLogo}
      >
        <div className="scroll-sidebar">
          <PerfectScrollbar className="sidebar-nav">
            {/*----------------------------------------------------------*/}
            {/* Sidebar Menus will go here                          */}
            {/*----------------------------------------------------------*/}
            <Nav id="sidebarnav">
              {this.props.routes.map((prop, key) => {
                if (prop.redirect) {
                  return null;
                }
                if (prop.navlabel) {
                  return (
                    <li className="nav-small-cap" key={key}>
                      <i className={prop.icon} />
                      <span className="hide-menu">{prop.name}</span>
                    </li>
                  );
                }
                if (prop.collapse) {
                  const firstdd = {};
                  firstdd[prop.state] = !this.state[prop.state];
                  return (
                    /*-------------------------------------------------------*/
                    /* Menus wiil be here                               */
                    /*-------------------------------------------------------*/
                    <li
                      className={`${this.activeRoute(prop.path)} sidebar-item`}
                      key={key}
                    >
                      <span
                        data-toggle="collapse"
                        className="sidebar-link has-arrow"
                        aria-expanded={this.state[prop.state]}
                        onClick={() => this.setState(firstdd)}
                      >
                        <i className={`${prop.icon} mr-3`} />
                        <span className="hide-menu">
                          {prop.name}
                          <span className={prop.badges}>{prop.badgeno}</span>
                        </span>
                      </span>
                      {/*-----------------------------------------------------*/}
                      {/* Sub-Menus will be here                         */}
                      {/*-----------------------------------------------------*/}
                      <Collapse isOpen={this.state[prop.state]}>
                        <ul className="first-level">
                          {prop.child.map((prop, key) => {
                            if (prop.redirect) return null;
                            if (prop.collapse) {
                              const seconddd = {};
                              seconddd[prop.state] = !this.state[prop.state];
                              return (
                                <li
                                  className={`${this.activeRoute(
                                    prop.path,
                                  )} sidebar-item`}
                                  key={key}
                                >
                                  <span
                                    data-toggle="collapse"
                                    className="sidebar-link has-arrow"
                                    aria-expanded={this.state[prop.state]}
                                    onClick={() => this.setState(seconddd)}
                                  >
                                    <i className={prop.icon} />
                                    <span className="hide-menu">
                                      {prop.name}
                                    </span>
                                  </span>
                                  {/*------------------------------------------------------*/}
                                  {/* Sub-Menus wiil be here                          */}
                                  {/*------------------------------------------------------*/}
                                  <Collapse isOpen={this.state[prop.state]}>
                                    <ul className="second-level">
                                      {prop.subchild.map((prop, key) => {
                                        if (prop.redirect) return null;
                                        return (
                                          <li
                                            className={`${this.activeRoute(
                                              prop.path,
                                            )} sidebar-item`}
                                            key={key}
                                          >
                                            <NavLink
                                              to={prop.path}
                                              activeClassName="active"
                                              className="sidebar-link"
                                            >
                                              <i className={prop.icon} />
                                              <span className="hide-menu">
                                                {prop.name}
                                              </span>
                                            </NavLink>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </Collapse>
                                </li>
                              );
                            }
                            return (
                              /*----------------------------------------*/
                              /* Adding Sidebar Item                    */
                              /*----------------------------------------*/
                              <li
                                className={`${this.activeRoute(
                                  prop.path,
                                )} sidebar-item`}
                                key={key}
                              >
                                <NavLink
                                  to={prop.path}
                                  className="sidebar-link"
                                  activeClassName="active"
                                >
                                  <i className={prop.icon} />
                                  <span className="hide-menu">{prop.name}</span>
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      </Collapse>
                    </li>
                  );
                }
                if (
                  this.props.users.accountInfo
                  && prop.authorisedRoles
                  && prop.authorisedRoles.indexOf(
                    this.props.users.accountInfo.membershipInfo.roles[0],
                  ) === -1
                ) {
                  return null;
                }
                return (
                  /*-----------------------------*/
                  /*                             */
                  /*-----------------------------*/
                  <li
                    className={`${this.activeRoute(prop.path)} sidebar-item`}
                    key={key}
                  >
                    <NavLink
                      to={prop.path}
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      <img
                        alt="sidebar-icon"
                        src={prop.icon}
                        className="sidebar-icon mr-3"
                      />
                      <span className="hide-menu">{prop.name}</span>
                    </NavLink>
                  </li>
                );
              })}
            </Nav>

            <hr style={{ border: "1px solid rgba(232, 231, 234, 0.1)" }} />

            {this.props.users.teamsList && this.renderTeamNavigation()}

            <hr style={{ border: "1px solid rgba(232, 231, 234, 0.1)" }} />

            {this.renderSidebarFooter()}
          </PerfectScrollbar>
        </div>
      </aside>
    );
  }
}

export default connect(mapStateToProps)(Sidebar);
