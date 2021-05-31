import React from "react";
import {
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { connect, useDispatch } from "react-redux";
import {
  withRouter, Switch, Route, Redirect,
} from "react-router-dom";
import { APP_ROLES } from "utils/constants";
import ZeedasBadge from "../../../zeedas-components/badge";
import colors from "../../../utils/colors";
import MoreIcon from "../../../zeedas-assets/icons/icon-more";
import BadgeBIcon from "../../../zeedas-assets/icons/icon-badge-b";
import BadgeCIcon from "../../../zeedas-assets/icons/icon-badge-c";
import BadgeDIcon from "../../../zeedas-assets/icons/icon-badge-d";
import EyeIcon from "../../../zeedas-assets/icons/icon-eye";
import IconDelete from "../../../zeedas-assets/icons/icon-delete";
import CardComponent from "../../../zeedas-components/card";
import { AppUtils } from "../../../utils/app-utils";
import SuspendTeamMemberModal from "./suspend-team-member-modal";
import EnableTeamMemberModal from "./enable-team-member-modal";
import AssignProjectLeadModal from "./assign-project-lead-modal";
import DeleteTeamMemberModal from "./delete-team-member-modal";
import AccountAvatar from "../../users/user-profile/_components/account-avatar";
import ChangeTeamRoleModal from "./change-team-role-modal";
import { projectActions } from "../../../state/redux/project/actions";

const renderPerformanceBadge = (performance) => {
  switch (performance) {
    case "B":
      return <BadgeBIcon />;
    case "C":
      return <BadgeCIcon />;
    case "D":
      return <BadgeDIcon />;
    default:
      return null;
  }
};
// const dispatch = useDispatch();

class TeamsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteModal: false,
      openSuspendModal: false,
      openEnableModal: false,
      openChangeRoleModal: false,
      openAssignLeadModal: false,
      memberData: null,
      adminRole: false,
    };
  }

  async componentDidMount() {
    this.checkRole();
  }

  openSuspendTeamMemberModal = (data) => {
    this.setState({ memberData: data, openSuspendModal: true });
  };

  closeSuspendTeamMemberModal = () => {
    this.setState({ openSuspendModal: false, memberData: null });
  };

  openEnableTeamMemberModal = (data) => {
    this.setState({ memberData: data, openEnableModal: true });
  };

  openAssignProjectLeadModal = (data) => {
    this.setState({ memberData: data, openAssignLeadModal: true });
  };

  closeAssignProjectLeadModal = () => {
    this.setState({ openAssignLeadModal: false, memberData: null });
  };

  closeEnableTeamMemberModal = () => {
    this.setState({ openEnableModal: false, memberData: null });
  };

  openDeleteTeamMemberModal = (data) => {
    this.setState({ memberData: data, openDeleteModal: true });
  };

  closeDeleteTeamMemberModal = () => {
    this.setState({ openDeleteModal: false, memberData: null });
  };

  openChangeTeamRoleModal = (data) => {
    this.setState({ memberData: data, openChangeRoleModal: true });
  };

  closeChangeRoleModal = () => {
    this.setState({ openChangeRoleModal: false, memberData: null });
  };

  fetchProjectMemberProfile = async (data) => {
    await this.props.dispatch(projectActions.fetchProjectMemberProfile(data));
    window.location.href = `/project-member-profile/${data.user._id}`;
    // history.push(`/team-member-profile/${data.user._id}`);
  };

  checkRole = async () => {
    await this.props.roles.forEach((element) => {
      if (element == "admin") {
        this.setState({ adminRole: true });
      }
    });
  };

  render() {
    const {
      coreTeam, contractTeam, single_project, userId,
    } = this.props;
    const {
      memberData,
      openDeleteModal,
      openSuspendModal,
      openEnableModal,
      openAssignLeadModal,
      openChangeRoleModal,
      adminRole,
    } = this.state;
    const validProjectMember = (role) => role !== APP_ROLES.ADMIN && role !== APP_ROLES.OWNER;
    return (
      <>
        {memberData && (
          <SuspendTeamMemberModal
            open={openSuspendModal}
            onClose={this.closeSuspendTeamMemberModal}
            memberData={memberData}
          />
        )}

        {memberData && (
          <EnableTeamMemberModal
            open={openEnableModal}
            onClose={this.closeEnableTeamMemberModal}
            memberData={memberData}
          />
        )}
        {memberData && (
          <AssignProjectLeadModal
            open={openAssignLeadModal}
            onClose={this.closeAssignProjectLeadModal}
            memberData={memberData}
          />
        )}
        {memberData && (
          <DeleteTeamMemberModal
            open={openDeleteModal}
            onClose={this.closeDeleteTeamMemberModal}
            memberData={memberData}
          />
        )}

        {memberData && (
          <ChangeTeamRoleModal
            open={openChangeRoleModal}
            onClose={this.closeChangeRoleModal}
            memberData={memberData}
          />
        )}
        <CardComponent>
          <div className="teams-container">
            <Table className="no-wrap v-middle mb-0" hover responsive>
              <thead className="teams-header">
                <tr className="border-0">
                  <th style={{ width: "30%" }} className="border-0">
                    #
                  </th>
                  <th style={{ width: "20%" }} className="border-0">
                    Roles
                  </th>
                  <th style={{ width: "20%" }} className="border-0">
                    Performance
                  </th>
                  <th style={{ width: "20%" }} className="border-0">
                    Invite Status
                  </th>
                  <th style={{ width: "10%" }} className="border-0" />
                </tr>
              </thead>

              <tbody>
                <tr className="core-team-header">
                  <td>
                    <div className="d-flex no-block align-items-center">
                      <p className="font-bold mb-0">Core Team &nbsp;</p>
                      <ZeedasBadge backgroundColor={colors.ZEEDAS_ORANGE}>
                        {coreTeam.length}
                      </ZeedasBadge>
                    </div>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                {/* <Collapse isOpen={isOpen}> */}
                {coreTeam.map((item) => (
                  <tr className="team-item" key={item._id}>
                    <td>
                      <div className="d-flex no-block align-items-center">
                        <div className="mr-2">
                          <AccountAvatar
                            source={item.user.avatar}
                            backgroundColor={item.user.avatarColor}
                            name={item.user.name}
                            dimension={50}
                            borderRadius={25}
                            fontSize={12}
                          />
                        </div>
                        <div className="ml-2">
                          <p className="font-bold mb-0 team-member-name">
                            {item.user && item.user.name}
                          </p>
                          <small
                            className="font-14"
                            style={{ color: colors.ZEEDAS_ORANGE }}
                          >
                            {item.user ? item.user.email : item.email}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.user ? (
                        item.projectRoles.map((role, key) => (
                          <>
                            {validProjectMember(role) && (
                              <span className="mr-2">
                                <ZeedasBadge
                                  key={key}
                                  backgroundColor={colors.ZEEDAS_FADED_BLUE}
                                  color={colors.ZEEDAS_BLUE}
                                >
                                  <span className="text-capitalize role-badge">
                                    {AppUtils.interpretRole(role)}
                                  </span>
                                </ZeedasBadge>
                              </span>
                            )}
                          </>
                        ))
                      ) : (
                        <>
                          {validProjectMember(item.projectRoles) && (
                            <ZeedasBadge
                              backgroundColor={colors.ZEEDAS_FADED_BLUE}
                              color={colors.ZEEDAS_BLUE}
                            >
                              <span className="text-capitalize role-badge">
                                {AppUtils.interpretRole(item.projectRoles)}
                              </span>
                            </ZeedasBadge>
                          )}
                        </>
                      )}
                    </td>

                    <td className="text-center">
                      {renderPerformanceBadge(item.performance)}
                    </td>
                    <td>{!item.user && "Pending Invite"}</td>

                    <td>
                      {item.user && (
                        <UncontrolledDropdown direction="down">
                          <DropdownToggle
                            nav
                            style={{ background: "none", border: "none" }}
                          >
                            <span>
                              <MoreIcon />
                            </span>
                          </DropdownToggle>

                          <DropdownMenu
                            className="px-3"
                            center
                            style={{ borderRadius: "5px" }}
                          >
                            {item.user && (
                              <DropdownItem
                                onClick={() => this.fetchProjectMemberProfile(item)}
                                // href={`/team-member-profile/${item.user._id}`}
                              >
                                <EyeIcon style={{ marginRight: "10px" }} />
                                View Profile
                              </DropdownItem>
                            )}
                            {userId === single_project.leadId && (
                              <DropdownItem
                                onClick={() => this.openChangeTeamRoleModal(item)}
                              >
                                Change Role
                              </DropdownItem>
                            )}
                            {(userId === single_project.leadId
                              || adminRole) && (
                              <DropdownItem
                                onClick={() => this.openAssignProjectLeadModal(item)}
                              >
                                Assign as Project Lead
                              </DropdownItem>
                            )}
                            {userId === single_project.leadId && (
                              <DropdownItem
                                style={{ color: colors.ZEEDAS_RED }}
                                onClick={() => this.openDeleteTeamMemberModal(item)}
                              >
                                <IconDelete style={{ marginRight: "10px" }} />
                                {"  "}
                                Remove Team member
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      )}
                    </td>
                  </tr>
                ))}
                {/* </Collapse> */}
                {contractTeam.length > 0 && (
                  <tr className="contract-team-header">
                    <td>
                      <div className="d-flex no-block align-items-center">
                        {/* <div className="ml-2"> */}
                        <p className="font-bold mb-0">Contract Staff</p>

                        {/* </div> */}
                      </div>
                    </td>
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                )}
                {/* <Collapse isOpen={isOpen}> */}
                {contractTeam.map((item) => (
                  <tr className="team-item" key={item._id}>
                    <td>
                      <div className="d-flex no-block align-items-center">
                        <div className="mr-2">
                          <AccountAvatar
                            source={item.user.avatar}
                            backgroundColor={item.user.avatarColor}
                            name={item.user.name}
                            dimension={50}
                            borderRadius={25}
                            fontSize={12}
                          />
                        </div>
                        <div className="ml-2">
                          <p className=" font-bold mb-0 team-member-name">
                            {item.user && item.user.name}
                          </p>
                          <small
                            className="font-14"
                            style={{ color: colors.ZEEDAS_ORANGE }}
                          >
                            {item.user ? item.user.email : item.email}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.user ? (
                        item.roles.map((role, key) => (
                          <>
                            {validProjectMember(role) && (
                              <ZeedasBadge
                                key={key}
                                backgroundColor={colors.ZEEDAS_FADED_BLUE}
                                color={colors.ZEEDAS_BLUE}
                              >
                                <span className="text-capitalize role-badge">
                                  {AppUtils.interpretRole(role)}
                                </span>
                              </ZeedasBadge>
                            )}
                          </>
                        ))
                      ) : (
                        <>
                          {validProjectMember(item.role) && (
                            <ZeedasBadge
                              backgroundColor={colors.ZEEDAS_FADED_BLUE}
                              color={colors.ZEEDAS_BLUE}
                            >
                              <span className="text-capitalize role-badge">
                                {AppUtils.interpretRole(item.role)}
                              </span>
                            </ZeedasBadge>
                          )}
                        </>
                      )}
                    </td>

                    <td>{renderPerformanceBadge(item.performance)}</td>
                    <td>{item.invited && "Pending Invite"}</td>

                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          nav
                          style={{ background: "none", border: "none" }}
                        >
                          <span>
                            <MoreIcon />
                          </span>
                        </DropdownToggle>

                        <DropdownMenu
                          className="px-3"
                          center
                          style={{ borderRadius: "5px" }}
                        >
                          {item.user && (
                            <DropdownItem
                              href={`/team-member-profile/${item.user._id}`}
                            >
                              <EyeIcon style={{ marginRight: "10px" }} />
                              {" "}
                              View
                              Profile
                            </DropdownItem>
                          )}
                          <DropdownItem>
                            {"  "}
                            Add / Change Role
                          </DropdownItem>
                          <DropdownItem>
                            {"  "}
                            Projects Information
                          </DropdownItem>
                          {item.user.enabled ? (
                            <DropdownItem
                              onClick={() => this.openSuspendTeamMemberModal(item)}
                            >
                              Suspend Team member
                            </DropdownItem>
                          ) : (
                            <DropdownItem
                              onClick={() => this.openEnableTeamMemberModal(item)}
                            >
                              Enable Team member
                            </DropdownItem>
                          )}

                          <DropdownItem
                            style={{ color: colors.ZEEDAS_RED }}
                            onClick={() => this.openDeleteTeamMemberModal(item)}
                          >
                            <IconDelete style={{ marginRight: "10px" }} />
                            {"  "}
                            Delete Team member
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                ))}
                {/* </Collapse> */}
                {" "}
              </tbody>
            </Table>
          </div>
        </CardComponent>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { requests, users, projects } = state;
  return {
    requesting: requests.requesting,
    roles: users.accountInfo.membershipInfo.roles,
    userId: users.accountInfo.membershipInfo.user,
    single_project: projects.single_project,
  };
}
export default connect(mapStateToProps)(TeamsList);
// export default withRouter(TeamsList);
