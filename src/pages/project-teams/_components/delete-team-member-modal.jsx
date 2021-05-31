import React from "react";
import { connect } from "react-redux";
import ZeedasModal from "../../../zeedas-components/modal";
import ActionMessage from "../../../zeedas-components/action-message";
import { projectActions } from "../../../state/redux/project/actions";
import IconDeleteAlt from '../../../zeedas-assets/icons/icon-delete-alt';

class DeleteTeamMemberModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  closeModal = () => {
    this.props.onClose();
  };

  deleteTeamMember = async () => {
    const userId = this.props.memberData.user._id;
    const projectId = this.props.single_project._id;
    await this.props.dispatch(projectActions.deleteMember(projectId, userId));
    await this.props.dispatch(projectActions.fetchSingleProject(projectId));
    this.closeModal();
  };

  render() {
    const { open, memberData, single_project } = this.props;

    return (
      <ZeedasModal
        open={open}
        onClose={this.closeModal}
        title="Remove Team Member"
        description={`For ${memberData ? memberData.user.name : ""}`}
      >
        <ActionMessage
          question={`Are you sure you want to remove ${memberData.user.name}?`}
          info={`This team member will be permanently deleted from ${single_project.name}, and this action can not be undone. There are still some tasks assigned to this user`}
          proceedText="Remove User"
          btnProceedColor="zd-red"
          icon={<IconDeleteAlt fill={"white"}/>}
          onClickProceed={this.deleteTeamMember}
          onClickCancel={this.closeModal}
          requesting={this.props.requesting}
        />
      </ZeedasModal>
    );
  }
}
function mapStateToProps(state) {
  const { requests, projects } = state;
  return {
    requesting: requests.requesting,
    single_project: projects.single_project,
  };
}
export default connect(mapStateToProps)(DeleteTeamMemberModal);
