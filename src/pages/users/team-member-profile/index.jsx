import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setPageTitle } from "state/redux/app-header/actions";
import { usersActions } from "../../../state/redux/users/actions";
import MemberProfile from "../../../zeedas-components/member-profile";
import PageLoader from "../../../zeedas-components/page-loader";
import "./style.scss";

class TeamMemberProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  setProfileData = async() => {
    const { match } = this.props;
    await this.props
      .dispatch(usersActions.fetchTeamMemberProfile(match.params.accountId))
      .then(() =>
        this.props.dispatch(setPageTitle(this.props.profileData.user.name))
      ).catch(err=>{
        console.log(err)
      });
  };

  componentDidMount() {
    this.setProfileData();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (prevProps.match.params.accountId !== match.params.accountId) {
      this.setProfileData();
    }
  }

  render() {
    const { profileData, fullPageRequesting } = this.props;

    if (fullPageRequesting) {
      return <PageLoader />;
    }

    return <MemberProfile profileData={profileData} />;
  }
}

function mapStateToProps(state) {
  const { requests, users } = state;

  return {
    requesting: requests.requesting,
    fullPageRequesting: requests.fullPageRequesting,
    profileData: users.teamMemberProfile,
  };
}

export default withRouter(connect(mapStateToProps)(TeamMemberProfile));
