import React from "react";
import { connect } from "react-redux";
import ZeedasModal from "../../../zeedas-components/modal";
import { usersActions } from "../../../state/redux/users/actions";
import ActionMessage from "../../../zeedas-components/action-message";
import SuspendIcon from "../../../zeedas-assets/icons/icon-suspend";

class SuspendTeamMemberModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  closeModal = () => {
    this.props.onClose();
  };

  suspendTeamMember = () => {
    const userId = this.props.memberData.user._id;
    this.props.dispatch(usersActions.disableMember(userId));
  };

  render() {
    const { open, memberData } = this.props;

    return (
      <ZeedasModal
        open={open}
        onClose={this.closeModal}
        title="Suspend Team Member"
        description={`For ${memberData ? memberData.user.name : ""}`}
      >
        <ActionMessage
          question={`Are you sure you want to suspend ${memberData.user.name}?`}
          info="This team member will be suspended from zeedas. There are still some tasks assigned to this user"
          proceedText="Suspend User"
          btnProceedColor="zd-yellowish-orange"
          icon={<SuspendIcon />}
          onClickProceed={this.suspendTeamMember}
          onClickCancel={this.closeModal}
          requesting={this.props.requesting}
        />
      </ZeedasModal>
    );
  }
}
function mapStateToProps(state) {
  const { requests } = state;
  return {
    requesting: requests.requesting,
  };
}
export default connect(mapStateToProps)(SuspendTeamMemberModal);
