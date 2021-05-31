import React from "react";
import { connect } from "react-redux";
import ZeedasModal from "../../../zeedas-components/modal";
import { projectActions } from "../../../state/redux/project/actions";
import ActionMessage from "../../../zeedas-components/action-message";
import SuspendIcon from "../../../zeedas-assets/icons/icon-suspend";

class AssignProjectLeadModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  closeModal = () => {
    this.props.onClose();
  };

  assignProjectLead = async () => {
    const userId = this.props.memberData.user._id;

    const projectId = this.props.single_project._id;
    await this.props.dispatch(
      projectActions.assignProjectLead(projectId, userId)
    );
    await this.props.dispatch(projectActions.fetchSingleProject(projectId));
    this.closeModal();
  };

  render() {
    const { open, memberData, single_project } = this.props;

    return (
      <ZeedasModal
        open={open}
        onClose={this.closeModal}
        title="Assign Team Lead"
        description={`For ${single_project.name}`}
      >
        <ActionMessage
          question={`Are you sure you want to assign ${memberData.user.name} as team lead?`}
          info="This team member will be assigned"
          proceedText="Assign Team Lead"
          btnProceedColor="zd-green"
          icon={<SuspendIcon />}
          onClickProceed={this.assignProjectLead}
          onClickCancel={this.closeModal}
          requesting={this.props.requesting}
        />
      </ZeedasModal>
    );
  }
}
function mapStateToProps(state) {
  const { requests, projects, users } = state;
  return {
    requesting: requests.requesting,
    accountInfo: users.accountInfo,
    single_project: projects.single_project,
  };
}
export default connect(mapStateToProps)(AssignProjectLeadModal);
