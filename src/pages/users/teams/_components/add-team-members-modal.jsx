import React from 'react';
import { connect } from 'react-redux';
import ZeedasModal from '../../../../zeedas-components/modal';
import CardComponent from '../../../../zeedas-components/card';
import TabNavigation from '../../../../zeedas-components/tab-navigation';
import CoreTeamForm from './core-team-form';
import ContractTeamForm from './contract-team-form';
import { usersActions } from '../../../../state/redux/users/actions';
import BlockLevelButton from '../../../../zeedas-components/block-level-button';
import ButtonLoadingIcon from '../../../../zeedas-assets/icons/icon-button-loader';
import { APP_ROLES } from '../../../../utils/constants';
import { notify } from '../../../../zeedas-components/bottom-notification';
import { NOTIFICATION_FAILURE } from '../../../../constants';
import InviteTeamMemberForm from '../../_components/invite-team-member-form/index';

class AddTeamMemberModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  closeModal = () => {
    this.props.onClose();
  };

  render() {
    const { accountInfo } = this.props;
    return (
      <ZeedasModal
        maxWidth="580px"
        open={this.props.open}
        onClose={this.closeModal}
        title="Add Team member"
        description={`For ${
          accountInfo ? accountInfo.user.account.companyName : ''
        }`}
      >
        <div className="add-team-members-card p-5">
          <InviteTeamMemberForm handleSuccess={this.closeModal} />
        </div>
      </ZeedasModal>
    );
  }
}
function mapStateToProps(state) {
  const { requests, users } = state;
  return {
    requesting: requests.requesting,
    teamsList: users.teamsList,
    roles: users.userRoles,
    accountInfo: users.accountInfo,
  };
}
export default connect(mapStateToProps)(AddTeamMemberModal);
