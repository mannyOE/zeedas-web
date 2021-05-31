import React from "react";
import { connect } from "react-redux";
import ZeedasModal from "./modal";
import CardComponent from "./card";
import RoleList from "../pages/users/teams/_components/role-list";
import BlockLevelButton from "./block-level-button";
import ButtonLoadingIcon from "../zeedas-assets/icons/icon-button-loader";
import { usersActions } from "../state/redux/users/actions";
import { AppUtils } from "../utils/app-utils";
import { APP_ROLES } from "../utils/constants";
import RoleListWithCheckbox from "../pages/users/teams/_components/role-list-with-checkbox";

class ChangeRoleModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRole: false,
      roles: [],
      checkedRoles: null,
    };
  }

  componentDidMount() {
    const { roles, memberData } = this.props;
    this.setState({ checkedRoles: memberData.roles });

    const rolesWithoutOwner = roles.filter(
      (role) => role.value !== APP_ROLES.OWNER
    );
    this.setState({ roles: rolesWithoutOwner });
  }

  closeModal = () => {
    this.props.onClose();
  };

  onChangeTeamRole = (e, roleValue) => {
    const { checkedRoles } = this.state;

    if (checkedRoles.includes(roleValue)) {
      const updatedCheckedRoles = checkedRoles.filter(
        (role) => role !== roleValue
      );
      this.setState({ checkedRoles: updatedCheckedRoles });
    } else {
      const updatedCheckedRoles = [...checkedRoles, roleValue];
      this.setState({ checkedRoles: updatedCheckedRoles });
    }
  };

  updateRole = async () => {
    const { checkedRoles } = this.state;
    const { dispatch, memberData } = this.props;
    const payload = {
      update: {
        roles: [...checkedRoles],
      },
    };

    const teamMemberId = memberData.user._id;
    await dispatch(usersActions.updateTeamMember(payload, teamMemberId));
    await dispatch(usersActions.fetchTeamMembers());
  };

  render() {
    const { selectedRole, roles, checkedRoles } = this.state;
    const { requesting, memberData } = this.props;

    return (
      <>
        <ZeedasModal
          width="580px"
          open={this.props.open}
          onClose={this.closeModal}
          title="Change Team Role"
          description={`For ${memberData ? memberData.user.name : ""}`}
        >
          <div className="change-team-role-modal">
            <CardComponent
              style={{ paddingTop: "22px", paddingBottom: "60px" }}
              bgColor="#FCFCFC"
            >
              <p className="description">
                Select the type of role you would love{" "}
                <span className="font-bold">{`${memberData.user.name}`}</span>{" "}
                to take up using zeedas
              </p>
              <RoleListWithCheckbox
                roles={roles}
                name="core-team-role"
                onChangeTeamRole={this.onChangeTeamRole}
                selectedRole={selectedRole}
                checkedRoles={checkedRoles}
              />
              <div className="update-role-button">
                <BlockLevelButton onClick={this.updateRole} color="zd-blue">
                  {requesting ? <ButtonLoadingIcon /> : `Update role`}
                </BlockLevelButton>
              </div>
            </CardComponent>
          </div>
        </ZeedasModal>
      </>
    );
  }
}
function mapStateToProps(state) {
  const { requests, users } = state;
  return {
    requesting: requests.requesting,
    roles: users.userRoles,
    accountInfo: users.accountInfo,
  };
}
export default connect(mapStateToProps)(ChangeRoleModal);
