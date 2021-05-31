import React from "react";
import { connect } from "react-redux";
import ZeedasModal from "../../../zeedas-components/modal";
import CardComponent from "../../../zeedas-components/card";
import { ListGroup, ListGroupItem } from "reactstrap";
import ZeedasCheckbox from "../../../zeedas-components/checkbox";
// import RoleList from "./role-list";
import EditRoleList from "./edit-role-list";
import BlockLevelButton from "../../../zeedas-components/block-level-button";
import ButtonLoadingIcon from "../../../zeedas-assets/icons/icon-button-loader";
import { projectActions } from "../../../state/redux/project/actions";

class ChangeRoleModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: {},
      // selectedRole: [],
    };
  }

  componentDidMount() {
    // this.props.dispatch(usersActions.fetchAccountInfo());

    const initialIsChecked = this.props.memberData.projectRoles.reduce(
      (acc, d) => {
        acc[d] = true;
        return acc;
      },
      {}
    );
    this.setState({ isChecked: initialIsChecked });
  }

  closeModal = () => {
    this.props.onClose();
  };
  onChangeTeamRole = (event) => {
    this.setState({
      isChecked: {
        ...this.state.isChecked,
        [event.target.name]: event.target.checked,
      },
    });
  };
  updateRole = async () => {
    let roles = [];
    let { isChecked } = this.state;
    for (const key in isChecked) {
      if (isChecked.hasOwnProperty(key)) {
        const element = isChecked[key];
        if (element) {
          await roles.push(key);
        }
      }
    }

    const payload = {
      roles: roles,
      userId: this.props.memberData.user._id,
      projectId: this.props.single_project._id,
    };
    await this.props.dispatch(projectActions.changeTeamRole(payload));
    await this.props.dispatch(
      projectActions.fetchSingleProject(this.props.single_project._id)
    );
    this.closeModal();
  };

  render() {
    const { selectedRole, isChecked } = this.state;
    const { roles, requesting, memberData } = this.props;

    return (
      <>
        {!requesting && (
          <ZeedasModal
            width="580px"
            open={this.props.open}
            onClose={this.closeModal}
            title="Change Team Role"
            description={`For ${memberData ? memberData.user.name : ""}`}
          >
            <div className="edit-team-members-modal">
              <CardComponent
                style={{ padding: "53px" }}
                bgColor="#FCFCFC"
                borderRadius="15px"
              >
                <p className="description-header">
                  {" "}
                  Select the type of role you would love Jane Foster to take up
                  using zeedas
                </p>
                <EditRoleList
                  roles={roles}
                  id="edit-"
                  name="core-team-role"
                  onChangeTeamRole={this.onChangeTeamRole}
                  isChecked={isChecked}
                />

                <div className="add-team-members-button mt-4">
                  <BlockLevelButton onClick={this.updateRole} color="zd-blue">
                    {requesting ? <ButtonLoadingIcon /> : `Update role`}
                  </BlockLevelButton>
                </div>
              </CardComponent>
            </div>
          </ZeedasModal>
        )}
      </>
    );
  }
}
function mapStateToProps(state) {
  const { requests, users, projects } = state;
  return {
    requesting: requests.requesting,
    roles: users.userRoles,
    accountInfo: users.accountInfo,
    single_project: projects.single_project,
  };
}
export default connect(mapStateToProps)(ChangeRoleModal);
