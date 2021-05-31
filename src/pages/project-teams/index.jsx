import React from "react";
import { connect } from "react-redux";
import { Container, Button } from "react-floating-action-button";
import TeamsList from "./_components/teams-list";
import { usersActions } from "../../state/redux/users/actions";
import { projectActions } from "../../state/redux/project/actions";
import IconPlus from "../../zeedas-assets/icons/icon-plus";
import colors from "../../utils/colors";
import AddTeamMembersModal from "./_components/add-team-members-modal";
import PageLoader from "../../zeedas-components/page-loader";

class ProjectTeams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddModal: false,
      single_project: {},
      requesting: false,
    };
  }

  async componentDidMount() {
    this.setState({ requesting: true });
    await this.props.dispatch(usersActions.fetchTeamMembers());
    await this.props.dispatch(usersActions.fetchRoles());
    await this.props.dispatch(
      projectActions.fetchSingleProject(this.props.single_project._id),
    );

    // const project = await this.filterProject();
    await this.setState({ requesting: false });
  }

  filterProject() {
    const singleProject = this.props.single_project;
    const getUsers = singleProject.users.filter(
      (user) => user.projectMember !== undefined && user.projectMember === true,
      // if (
      //   user.projects.length == 0 ||
      //   user.projects == null ||
      //   user.projects == undefined
      // )
      //   return false;

      // let userProjects = user.projects.filter(
      //   (project) => project.id == singleProject._id
      // );

      // if (userProjects.length != 0) {
      //   return true;
      // } else {
      //   return false;
      // }
    );
    singleProject.users = getUsers;
    return singleProject;
  }

  openAddTeamMembersModal = () => {
    this.setState({ openAddModal: true });
  };

  closeAddTeamMembersModal = () => {
    this.setState({ openAddModal: false });
  };

  render() {
    const {
      teamsList, requesting, single_project, userId,
    } = this.props;
    // const{single_project} = this.state
    if (this.state.requesting) {
      return <PageLoader />;
    }
    return (
      <div style={{ margin: "0 100px" }}>
        <AddTeamMembersModal
          open={this.state.openAddModal}
          onClose={this.closeAddTeamMembersModal}
        />

        {teamsList && (
          <TeamsList coreTeam={single_project.users} contractTeam={[]} />
        )}

        <Container>
          {userId === single_project.leadId && (
            <Button
              className="fab-item btn btn-link btn-lg text-white"
              styles={{ backgroundColor: colors.ZEEDAS_BLUE }}
              onClick={() => this.openAddTeamMembersModal()}
            >
              <IconPlus />
            </Button>
          )}
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requests, users, projects } = state;
  return {
    requesting: requests.requesting,
    teamsList: users.teamsList,
    userId: users.accountInfo.membershipInfo.user,
    roles: users.userRoles,
    single_project: projects.single_project,
  };
}

export default connect(mapStateToProps)(ProjectTeams);
