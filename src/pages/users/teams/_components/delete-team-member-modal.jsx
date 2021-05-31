import React from "react";
import { connect } from "react-redux";
import ZeedasModal from "../../../../zeedas-components/modal";
import { usersActions } from "../../../../state/redux/users/actions";
import ActionMessage from "../../../../zeedas-components/action-message";
import IconDeleteOutline from '../../../../zeedas-assets/icons/icon-delete-outline';

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
    await this.props.dispatch(usersActions.deleteMember(userId));
    await this.props.dispatch(usersActions.fetchTeamMembers());
  };

  render() {
    const { open, memberData } = this.props;

    return (
      <ZeedasModal
        open={open}
        onClose={this.closeModal}
        title="Remove Team Member"
        description={`For ${memberData ? memberData.user.name : ""}`}
      >
        <ActionMessage
          question={`Are you sure you want to remove ${memberData.user.name}?`}
          info="This team member will be permanently deleted from zeedas, and this action can not be undone. There are still some tasks assigned to this user"
          proceedText="Delete User"
          btnProceedColor="zd-red"
          icon={<IconDeleteOutline fill={"#ffffff"} />}
          onClickProceed={this.deleteTeamMember}
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
export default connect(mapStateToProps)(DeleteTeamMemberModal);
