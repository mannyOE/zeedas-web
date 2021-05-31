import React from "react";
import { connect } from "react-redux";
import { usersActions } from "../../../state/redux/users/actions";
import MemberProfile from "../../../zeedas-components/member-profile";
import PageLoader from "../../../zeedas-components/page-loader";

class TeamMemberProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profileData, requesting, fullPageRequesting } = this.props;

    if (fullPageRequesting) {
      return <PageLoader />;
    }

    return (
      <>
        <MemberProfile profileData={profileData} />
      </>
    );
  }
}

function mapStateToProps(state) {
  const { requests, users, projects } = state;

  return {
    requesting: requests.requesting,
    fullPageRequesting: requests.fullPageRequesting,
    profileData: projects.project_member_profile,
  };
}

export default connect(mapStateToProps)(TeamMemberProfile);
