import React from 'react';
import './style.scss';
import { connect } from 'react-redux';
import BlockLevelButton from 'zeedas-components/block-level-button';
import { usersActions } from 'state/redux/users/actions';
import ButtonLoadingIcon from 'zeedas-assets/icons/icon-button-loader';
import { notify } from 'zeedas-components/bottom-notification';
import { NOTIFICATION_FAILURE } from '../../../../constants/index';
import { ERROR_RESPONSE } from 'utils/constants';
import FormField from './form-field';

class InviteTeamMemberForm2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invitees: [{ email: '', role: [] }],
      invitesWithLabels: [{ email: '', selectedRole: [], errorStatus: false }],
      employmentMode: 'fulltime',
    };
  }

  componentDidMount() {
    this.props.dispatch(usersActions.fetchRoles());
  }

  updateInviteList = (invites, withLabels, index) => {
    const invitees = [...this.state.invitees];
    const invitesWithLabels = [...this.state.invitesWithLabels];

    invitees[index] = { ...invitees[index], ...invites };
    invitesWithLabels[index] = { ...invitesWithLabels[index], ...withLabels };
    this.setState({ invitees, invitesWithLabels });
  };

  addNewFormField = () => {
    this.setState({ email: '', role: [] });
    const invitees = [...this.state.invitees];
    const invitesWithLabels = [...this.state.invitesWithLabels];

    invitees.push({ email: '', role: [] });
    invitesWithLabels.push({ email: '', selectedRole: [] });
    this.setState({ invitees, invitesWithLabels });
  };

  updateErrorStatus = (errorStatus, index) => {
    const invitesWithLabels = [...this.state.invitesWithLabels];
    invitesWithLabels[index].errorStatus = errorStatus;
    this.setState({ invitesWithLabels });
  };

  deleteInvitee = (inviteeIndex) => {
    const { invitees, invitesWithLabels } = this.state;
    const updatedInvitees = invitees.filter(
      (item, index) => index !== inviteeIndex
    );
    const updatedInvitesWithLabels = invitesWithLabels.filter(
      (item, index) => index !== inviteeIndex
    );
    this.setState({
      invitees: updatedInvitees,
      invitesWithLabels: updatedInvitesWithLabels,
    });
  };

  sendInvites = () => {
    const { invitees } = this.state;
    if (invitees.length < 1) {
      notify('Your invite list is empty', NOTIFICATION_FAILURE);
      return;
    }
    const payload = {
      invitations: this.state.invitees,
      employmentMode: this.state.employmentMode,
    };
    this.props
      .dispatch(usersActions.inviteTeamMembers(payload))
      .then((response) => {
        if (response.status === ERROR_RESPONSE) return;
        this.setState(
          {
            email: '',
            invitees: [],
            selectedRole: { label: '', value: '' },
            employmentMode: 'fulltime',
            errors: {},
          },
          this.props.handleSuccess()
        );
      });
  };

  render() {
    const { invitesWithLabels } = this.state;
    const { userRoles, requesting } = this.props;
    const hasError = invitesWithLabels.find((invite) => invite.errorStatus);

    return (
      <div className="InviteTeamMemberForm">
        <div className="invite-list2 p-4">
          <p className="invite-list2__header">Invite List</p>
          <div className="row">
            <div className="col-md-4">
              <p className="email-label">Work Email</p>
            </div>
            <div className="col-md-8">
              <p className="email-label">Select role(s)</p>
            </div>
          </div>
          {invitesWithLabels.map((invite, index) => (
            <FormField
              afterSubmit={this.addNewFormField}
              key={index}
              showSubmit={index === invitesWithLabels.length - 1}
              data={invite}
              hideDeleteIcon = {invitesWithLabels.length === 1}
              userRoles={userRoles}
              deleteItem={() => this.deleteInvitee(index)}
              updateErrorStatus={(errorStatus) =>
                this.updateErrorStatus(errorStatus, index)
              }
              onInputChange={(invite, invitesWithLabels) =>
                this.updateInviteList(invite, invitesWithLabels, index)
              }
            />
          ))}
        </div>
        <div className="" style={{ marginTop: '44px' }}>
          <BlockLevelButton
            disabled={requesting || invitesWithLabels.length === 0 || hasError}
            color="zd-blue"
            onClick={this.sendInvites}
          >
            {requesting ? <ButtonLoadingIcon /> : `Send invite`}
          </BlockLevelButton>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requests, users, auth } = state;
  return {
    requesting: requests.requesting,
    fullPageRequesting: requests.fullPageRequesting,
    userRoles: users.userRoles,
    user: auth.userData,
    accountInfo: users.accountInfo,
  };
}

export default connect(mapStateToProps)(InviteTeamMemberForm2);
