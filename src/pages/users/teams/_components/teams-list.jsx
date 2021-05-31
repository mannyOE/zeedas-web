import React from "react";
import {
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { connect } from "react-redux";
import ZeedasBadge from "../../../../zeedas-components/badge";
import colors from "../../../../utils/colors";
import MoreIcon from "../../../../zeedas-assets/icons/icon-more";
import BadgeBIcon from "../../../../zeedas-assets/icons/icon-badge-b";
import BadgeCIcon from "../../../../zeedas-assets/icons/icon-badge-c";
import BadgeDIcon from "../../../../zeedas-assets/icons/icon-badge-d";
import EyeIcon from "../../../../zeedas-assets/icons/icon-eye";
import CardComponent from "../../../../zeedas-components/card";
import { AppUtils } from "../../../../utils/app-utils";
import SuspendTeamMemberModal from "./suspend-team-member-modal";
import EnableTeamMemberModal from "./enable-team-member-modal";
import DeleteTeamMemberModal from "./delete-team-member-modal";
import AccountAvatar from "../../user-profile/_components/account-avatar";
import ChangeTeamRoleModal from "../../../../zeedas-components/change-team-role-modal";
import DefaultButton from "../../../../zeedas-components/default-button";
import { usersActions } from "../../../../state/redux/users/actions";
import ButtonLoadingIcon from "../../../../zeedas-assets/icons/icon-button-loader";
import { APP_ROLES } from "../../../../utils/constants";
import IconDeleteOutline from "../../../../zeedas-assets/icons/icon-delete-outline";

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

class TeamsList extends React.Component {
  constructor(props) {
    super(props);
    this.teamItemRefs = {};
    this.state = {
      openDeleteModal: false,
      openSuspendModal: false,
      openEnableModal: false,
      openChangeRoleModal: false,
      memberData: null,
      employmentMode: "fulltime",
    };
  }

  refAssigner = (instance, key, refStore) => {
    if (instance === null) {
      // eslint-disable-next-line no-param-reassign
      delete refStore[key];
    } else {
      // eslint-disable-next-line no-param-reassign
      refStore[key] = instance;
    }
  };

  showResendInvite = (e, resendCriterion) => {
    this.clearResendableClassnames(this.teamItemRefs);

    if (!resendCriterion) {
      e.currentTarget.classList.add("resendable");
    }
  };

  clearResendableClassnames = (refListObject) => {
    Object.keys(refListObject).forEach((btn) => {
      this.teamItemRefs[btn].classList.remove("resendable");
    });
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

  closeEnableTeamMemberModal = () => {
    this.setState({ openEnableModal: false, memberData: null });
  };

  openDeleteTeamMemberModal = (data) => {
    this.setState({ memberData: data, openDeleteModal: true });
  };

  closeDeleteTeamMemberModal = () => {
    this.setState({ openDeleteModal: false, memberData: null });
  };

  openChangeRoleModal = (data) => {
    this.setState({ memberData: data, openChangeRoleModal: true });
  };

  closeChangeRoleModal = () => {
    this.setState({ openChangeRoleModal: false, memberData: null });
  };

  resendInvite = (user) => {
    this.setState({ focusedUserId: user._id });
    const payload = {
      invitations: [{ email: user.email, role: user.role }],
      employmentMode: this.state.employmentMode,
    };
    this.props.dispatch(usersActions.inviteTeamMembers(payload));
  };

  makeOwner = async (memberData) => {
    const { dispatch } = this.props;
    const payload = {
      update: {
        roles: [APP_ROLES.OWNER],
      },
    };
    const teamMemberId = memberData.user._id;
    await dispatch(usersActions.updateTeamMember(payload, teamMemberId));
    await dispatch(usersActions.fetchAccountInfo());
    await dispatch(usersActions.fetchTeamMembers());
  };

  render() {
    const { coreTeam, contractTeam, requesting } = this.props;
    const {
      memberData,
      openDeleteModal,
      openSuspendModal,
      openEnableModal,
      openChangeRoleModal,
      focusedUserId,
    } = this.state;

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
          <div className="teams-container pb-4">
            <Table className="no-wrap v-middle mb-0" responsive>
              <thead className="teams-header">
                <tr className="border-0">
                  <th style={{ width: "20%" }} className="border-0">
                    #
                  </th>
                  <th style={{ width: "10%" }} className="border-0">
                    Roles
                  </th>
                  <th style={{ width: "10%" }} className="border-0 text-center">
                    Performance
                  </th>
                  <th style={{ width: "20%" }} className="border-0 text-center">
                    Invite Status
                  </th>
                  <th style={{ width: "10%" }} className="border-0" />
                </tr>
              </thead>

              <tbody>
                <tr className="core-team-header">
                  <td className="pl-4">
                    <div className="d-flex no-block align-items-center">
                      <p className="font-weight-bold mb-0">Core Team &nbsp;</p>
                      <ZeedasBadge
                        backgroundColor={colors.ZEEDAS_ORANGE}
                        style={{
                          padding: "3px 5px",
                          width: "max-content",
                        }}
                      >
                        {coreTeam.length}
                      </ZeedasBadge>
                      <span className="ml-4 font-weight-light" style={{ fontSize: "18px", opacity: "0.2" }}>|</span>
                    </div>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td style={{ padding: "10px" }} />
                </tr>
                {/* <Collapse isOpen={isOpen}> */}
                {coreTeam.map((item) => (
                  <tr
                    disabled={requesting && focusedUserId === item._id}
                    className="team-item"
                    key={item._id}
                    ref={(inst) => this.refAssigner(inst, item._id, this.teamItemRefs)}
                    onMouseEnter={(e) => this.showResendInvite(e, item.user)}
                    onMouseLeave={() => this.clearResendableClassnames(this.teamItemRefs)}
                  >
                    <td>
                      <div className="d-flex no-block align-items-center">
                        <div className="mr-2">
                          <AccountAvatar
                            source={item.user ? item.user.avatar : ""}
                            backgroundColor={
                              item.user
                                ? item.user.avatarColor
                                : "rgb(30, 150, 196)"
                            }
                            name={
                              item.user
                                ? item.user.name
                                  ? item.user.name
                                  : item.user.email
                                : item.email
                            }
                            height={50}
                            width={52}
                            borderRadius={25}
                            fontSize={12}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="font-bold mb-0 team-member-name">
                            {item.user && item.user.name}
                          </p>
                          <small
                            className="font-12"
                            style={{ color: colors.ZEEDAS_ORANGE }}
                          >
                            {item.user ? item.user.email : item.email}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      {item.user ? (
                        <ZeedasBadge
                          backgroundColor={colors.ZEEDAS_FADED_BLUE}
                          color={colors.ZEEDAS_BLUE}
                          style={{
                            height: "24px",
                            padding: "0 9px",
                            fontWeight: "600",
                          }}
                        >
                          <span className="text-capitalize font-normal role-badge">
                            {AppUtils.interpretRole(item.roles[0])}
                          </span>
                        </ZeedasBadge>
                      ) : (
                        <ZeedasBadge
                          backgroundColor={colors.ZEEDAS_FADED_BLUE}
                          color={colors.ZEEDAS_BLUE}
                          style={{
                            height: "24px",
                            padding: "0 9px",
                            fontWeight: "600",
                          }}
                        >
                          <span className="text-capitalize font-normal role-badge">
                            {AppUtils.interpretRole(item.role)}
                          </span>
                        </ZeedasBadge>
                      )}
                    </td>

                    <td className="text-center">
                      {renderPerformanceBadge(item.performance)}
                    </td>

                    <td className="text-center">
                      {!item.user && (
                        <span className="pending">Pending Invite</span>
                      )}
                    </td>

                    <td>
                      {!item.user && (
                        <DefaultButton
                          onClick={() => this.resendInvite(item)}
                          style={{
                            padding: "5px 10px",
                            height: "auto",
                            background: "none",
                            border: "none",
                            boxShadow: "none",
                            color: "#EB0E43",
                          }}
                          color="zd-blue"
                          className="resend-invite__button default-button__bold default-button__grounded"
                        >
                          {requesting && item._id === focusedUserId ? (
                            <ButtonLoadingIcon />
                          ) : (
                            <small>Resend Invite</small>
                          )}
                        </DefaultButton>
                      )}
                      {item.user
                        && AppUtils.getCurrentUserId() !== item.user._id
                        && (AppUtils.getCurrentUserRole() === APP_ROLES.OWNER
                          || AppUtils.getCurrentUserRole()
                            === APP_ROLES.ADMIN) && (
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
                                style={{
                                  borderRadius: "10px",
                                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                                {item.user
                                && item.roles[0] !== APP_ROLES.OWNER
                                && item.roles[0] !== APP_ROLES.ADMIN && (
                                  <DropdownItem
                                    href={`/team-member-profile/${item.user._id}`}
                                  >
                                    <EyeIcon />
                                    <span className="icon-text">
                                      View Profile
                                    </span>
                                  </DropdownItem>
                                )}
                                {AppUtils.getCurrentUserRole()
                                === APP_ROLES.OWNER
                                && item.user
                                && item.roles[0] !== APP_ROLES.OWNER && (
                                  <DropdownItem
                                    onClick={() => this.makeOwner(item)}
                                  >
                                    <span className="noicon-text">
                                      Make Owner
                                    </span>
                                  </DropdownItem>
                                )}
                                {AppUtils.getCurrentUserId()
                                !== item.user._id && (
                                <DropdownItem
                                  onClick={() => this.openChangeRoleModal(item)}
                                >
                                  <span className="noicon-text">
                                    Add / Change Role
                                  </span>
                                </DropdownItem>
                                )}
                                {/* <DropdownItem>Projects Information</DropdownItem> */}

                                {item.user.disabled
                                  ? (AppUtils.getCurrentUserRole()
                                    === APP_ROLES.OWNER
                                    || AppUtils.getCurrentUserRole()
                                      === APP_ROLES.ADMIN)
                                  && AppUtils.getCurrentUserId()
                                    !== item.user._id
                                  && item.roles[0] !== APP_ROLES.OWNER && (
                                    <DropdownItem
                                      onClick={() => this.openEnableTeamMemberModal(item)}
                                    >
                                      <span className="noicon-text">
                                        Enable Team member
                                      </span>
                                    </DropdownItem>
                                  )
                                  : (AppUtils.getCurrentUserRole()
                                    === APP_ROLES.OWNER
                                    || AppUtils.getCurrentUserRole()
                                      === APP_ROLES.ADMIN)
                                  && AppUtils.getCurrentUserId()
                                    !== item.user._id
                                  && item.roles[0] !== APP_ROLES.OWNER && (
                                    <DropdownItem
                                      onClick={() => this.openSuspendTeamMemberModal(item)}
                                    >
                                      <span className="noicon-text">
                                        Suspend Team member
                                      </span>
                                    </DropdownItem>
                                  )}

                                {(AppUtils.getCurrentUserRole()
                                === APP_ROLES.OWNER
                                || AppUtils.getCurrentUserRole()
                                  === APP_ROLES.ADMIN)
                                && AppUtils.getCurrentUserId() !== item.user._id
                                && item.roles[0] !== APP_ROLES.OWNER && (
                                  <DropdownItem
                                    className="d-flex align-items-center"
                                    style={{ color: colors.ZEEDAS_RED }}
                                    onClick={() => this.openDeleteTeamMemberModal(item)}
                                  >
                                    <IconDeleteOutline
                                      style={{ marginRight: "10px" }}
                                    />
                                    <span className="icon-text">
                                      Delete Team member
                                    </span>
                                  </DropdownItem>
                                )}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                      )}
                    </td>
                  </tr>
                ))}

                {/* {contractTeam.length > 0 && (
                  <tr className="contract-team-header">
                    <td>
                      <div className="d-flex no-block align-items-center">
                        <p className="font-bold mb-0">Contract Staff</p>

                      </div>
                    </td>
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                )}
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
                        <ZeedasBadge
                          backgroundColor={colors.ZEEDAS_FADED_BLUE}
                          color={colors.ZEEDAS_BLUE}
                        >
                          <span className="text-capitalize role-badge">
                            {AppUtils.interpretRole(item.roles[0])}
                          </span>
                        </ZeedasBadge>
                      ) : (
                        <ZeedasBadge
                          backgroundColor={colors.ZEEDAS_FADED_BLUE}
                          color={colors.ZEEDAS_BLUE}
                        >
                          <span className="text-capitalize role-badge">
                            {AppUtils.interpretRole(item.role)}
                          </span>
                        </ZeedasBadge>
                      )}
                    </td>

                    <td>{renderPerformanceBadge(item.performance)}</td>
                    <td>{item.invited && 'Pending Invite'}</td>

                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          nav
                          style={{ background: 'none', border: 'none' }}
                        >
                          <span>
                            <MoreIcon />
                          </span>
                        </DropdownToggle>

                        <DropdownMenu center style={{ borderRadius: '5px' }}>
                          {item.user && (
                            <DropdownItem
                              href={`/team-member-profile/${item.user._id}`}
                            >
                              <EyeIcon style={{ marginRight: '10px' }} />
                              <span className="icon-text">View Profile</span>
                            </DropdownItem>
                          )}
                          <DropdownItem>
                            <span className="noicon-text">
                              Add / Change Role
                            </span>
                          </DropdownItem>

                          {item.user.disabled ? (
                            <DropdownItem
                              onClick={() =>
                                this.openEnableTeamMemberModal(item)
                              }
                            >
                              <span className="noicon-text">
                                Enable Team member
                              </span>
                            </DropdownItem>
                          ) : (
                            <DropdownItem
                              onClick={() =>
                                this.openSuspendTeamMemberModal(item)
                              }
                            >
                              <span className="noicon-text">
                                Suspend Team member
                              </span>
                            </DropdownItem>
                          )}

                          <DropdownItem
                            className="d-flex align-items-center"
                            style={{ color: colors.ZEEDAS_RED }}
                            onClick={() => this.openDeleteTeamMemberModal(item)}
                          >
                            <IconDeleteOutline
                              style={{ marginRight: '10px' }}
                            />
                            <span className="icon-text">
                              Delete Team member
                            </span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </Table>
          </div>
        </CardComponent>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { requests } = state;
  return {
    requesting: requests.requesting,
  };
}
export default connect(mapStateToProps)(TeamsList);
