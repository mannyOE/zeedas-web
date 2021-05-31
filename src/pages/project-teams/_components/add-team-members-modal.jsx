import React from 'react';
import { connect } from 'react-redux';
import ZeedasModal from '../../../zeedas-components/modal';
import CardComponent from '../../../zeedas-components/card';
import TabNavigation from '../../../zeedas-components/tab-navigation';
import CoreTeamForm from './core-team-form/index';
import ContractTeamForm from './contract-team-form';
import { usersActions } from '../../../state/redux/users/actions';
import { projectActions } from '../../../state/redux/project/actions';
import BlockLevelButton from '../../../zeedas-components/block-level-button';
import ButtonLoadingIcon from '../../../zeedas-assets/icons/icon-button-loader';

class AddTeamMemberModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coreTeamEntries: [],
      contractTeamEntries: [],
      selectedRole: '',
      employmentMode: 'fulltime',
      requesting: false,
    };
  }

  componentDidMount() {
    // this.props.dispatch(usersActions.fetchAccountInfo());
  }

  closeModal = () => {
    this.props.onClose();
  };

  setCoreTeamEntries = (entries) => {
    this.setState({ coreTeamEntries: entries });
  };

  setContractTeamEntries = (entries) => {
    this.setState({ contractTeamEntries: entries });
  };
  setSelectedRole = (event, item) => {
    this.setState({
      selectedRole: {
        ...this.state.selectedRole,
        [event.target.name]: event.target.checked,
      },
    });
    //this.setState({ selectedRole: role });
  };
  sendInvites = async () => {
    this.setState({ requesting: true });
    const projectId = this.props.single_project._id;
    let userIds = [];
    let { selectedRole } = this.state;
    for (const key in selectedRole) {
      if (selectedRole.hasOwnProperty(key) && selectedRole[key]) {
        const element = selectedRole[key];
        if (element) {
          await userIds.push(key);
        }
      }
    }
    const payload = {
      projectId: projectId,
      userId: userIds,
    };
    await this.props.dispatch(projectActions.inviteTeamMembers(payload));

    await this.props.dispatch(
      projectActions.fetchSingleProject(payload.projectId)
    );
    this.setState({ requesting: false });
    await this.closeModal();
  };

  render() {
    const { coreTeamEntries, contractTeamEntries, coreTeam, selectedRole } = this.state;
    const { roles, requesting, single_project } = this.props;

    const totalEntries = coreTeamEntries.length + contractTeamEntries.length;

    return (
      <>
        {!this.setState.requesting && (
          <ZeedasModal
            maxWidth="580px"
            open={this.props.open}
            onClose={this.closeModal}
            title="Add Team member"
            description={`For ${single_project.name}`}
          >
            <div className="add-team-members-modal ">
              <CardComponent
                style={{
                  paddingBottom: '60px',
                  borderRadius: '15px'
                }}
                bgColor="#FCFCFC"
              >
                <>
                  <CoreTeamForm
                    coreTeamEntries={coreTeamEntries}
                    roles={roles}
                    setSelectedRole={this.setSelectedRole}
                    setCoreTeamEntries={this.setCoreTeamEntries}
                    currentCoreTeam={single_project.users}
                  />
                  {/* <TabNavigation
                    titlesPosition="center"
                    tabNavigationTitles={[
                      { tabId: 1, title: "Core Team Member" },
                      { tabId: 2, title: "Contract Staff", disabled: true },
                    ]}
                    tabNavigationContents={[
                      {
                        contentId: 1,
                        content: (
                          <CoreTeamForm
                            coreTeamEntries={coreTeamEntries}
                            roles={roles}
                            setSelectedRole={this.setSelectedRole}
                            setCoreTeamEntries={this.setCoreTeamEntries}
                          />
                        ),
                      },
                      {
                        contentId: 2,
                        content: (
                          <ContractTeamForm
                            contractTeamEntries={contractTeamEntries}
                            roles={roles}
                            setContractTeamEntries={this.setContractTeamEntries}
                          />
                        ),
                      },
                    ]}
                  /> */}
                  <div className="add-team-members-button px-4">
                    <BlockLevelButton
                      // disabled={totalEntries < 1}
                      onClick={this.sendInvites}
                      color="zd-blue"
                    >
                      {requesting ? <ButtonLoadingIcon /> : `Add User`}
                    </BlockLevelButton>
                  </div>
                </>
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
    teamsList: users.teamsList,
    single_project: projects.single_project,
    roles: users.userRoles,
    accountInfo: users.accountInfo,
  };
}
export default connect(mapStateToProps)(AddTeamMemberModal);
