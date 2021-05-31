import React from "react";
import { connect } from "react-redux";
import ZeedasModal from "../../../../zeedas-components/modal";
import { usersActions } from "../../../../state/redux/users/actions";
import ActionMessage from "../../../../zeedas-components/action-message";
import SuspendIcon from "../../../../zeedas-assets/icons/icon-suspend";

class EnableTeamMemberModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  closeModal = () => {
    this.props.onClose();
  };

  enableTeamMember = async () => {
    const userId = this.props.memberData.user._id;
    await this.props.dispatch(usersActions.enableMember(userId));
    await this.props.dispatch(usersActions.fetchTeamMembers());
  };

  render() {
    const { open, memberData } = this.props;

    return (
      <ZeedasModal
        open={open}
        onClose={this.closeModal}
        title="Enable Team Member"
        description={`For ${memberData ? memberData.user.name : ""}`}
      >
        <ActionMessage
          question={`Are you sure you want to enable ${memberData.user.name}?`}
          info="This team member will be enabled"
          proceedText="Enable User"
          btnProceedColor="zd-green"
          icon={<SuspendIcon />}
          onClickProceed={this.enableTeamMember}
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
export default connect(mapStateToProps)(EnableTeamMemberModal);
