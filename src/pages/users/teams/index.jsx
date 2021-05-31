import React from "react";
import { connect } from "react-redux";
import { Container, Button } from "react-floating-action-button";
import { setPageTitle } from "state/redux/app-header/actions";
import { PAGE_TITLES } from "utils/constants";
import TeamsList from "./_components/teams-list";
import { usersActions } from "../../../state/redux/users/actions";
import IconPlus from "../../../zeedas-assets/icons/icon-plus";
import colors from "../../../utils/colors";
import AddTeamMembersModal from "./_components/add-team-members-modal";
import PageLoader from "../../../zeedas-components/page-loader";
import "./style.scss";

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddModal: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(setPageTitle(PAGE_TITLES.team));
    this.props.dispatch(usersActions.fetchTeamMembers());
    this.props.dispatch(usersActions.fetchRoles());
  }

  openAddTeamMembersModal = () => {
    this.setState({ openAddModal: true });
  };

  closeAddTeamMembersModal = () => {
    this.setState({ openAddModal: false });
  };

  render() {
    const {
      teamsList,
      invitesList,
      requesting,
      fullPageRequesting,
    } = this.props;

    if (fullPageRequesting) {
      return <PageLoader message="loading teams" />;
    }
    return (
      <div className="container">
        <AddTeamMembersModal
          open={this.state.openAddModal}
          onClose={this.closeAddTeamMembersModal}
        />

        {teamsList && (
          <TeamsList
            coreTeam={[...teamsList.coreTeam, ...invitesList.coreTeam]}
            contractTeam={[teamsList.contractTeam, ...invitesList.contractTeam]}
          />
        )}

        <Container>
          <Button
            className="fab-item btn btn-link btn-lg text-white"
            styles={{ backgroundColor: colors.ZEEDAS_BLUE }}
            onClick={() => this.openAddTeamMembersModal()}
          >
            <IconPlus height={30} width={30} />
          </Button>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requests, users } = state;
  return {
    requesting: requests.requesting,
    fullPageRequesting: requests.fullPageRequesting,
    teamsList: users.teamsList,
    invitesList: users.invitedTeamsList,
    roles: users.userRoles,
  };
}

export default connect(mapStateToProps)(Teams);
