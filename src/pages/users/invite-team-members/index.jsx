import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import { usersActions } from "../../../state/redux/users/actions";
import LargeSlantBars from "../../../zeedas-assets/images/sidebar/slant-bars.svg";
import AccountAvatar from "../user-profile/_components/account-avatar";
import PageLoader from "../../../zeedas-components/page-loader";
import InviteTeamMemberForm from "../_components/invite-team-member-form/index";

class InviteTeamMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  skipInvites = () => {
    this.props.dispatch(usersActions.skipInvites());
  };

  goToProjects = () => {
    this.props.history.push("/projects");
  }

  render() {
    const {
      fullPageRequesting,
      accountInfo,
    } = this.props;

    if (fullPageRequesting) {
      return <PageLoader />;
    }
    return (
      <div id="invite-teams" className="my-5 w-100">
        <div className="container position-relative">
          <a onClick={this.skipInvites} className="skip-text font-18">
            Skip
          </a>
          <div className="d-flex justify-content-center">
            <div className="invite-right-container">
              <div className="text-center invite-header">
                <div className="my-4">
                  <AccountAvatar
                    source={accountInfo.user.avatar}
                    backgroundColor={accountInfo.user.avatarColor}
                    name={accountInfo.user.name}
                    dimension={88}
                    borderRadius={100}
                    fontSize={12}
                  />
                </div>

                <h2 className="invite-header-title font-24">
                  Welcome,
                  {" "}
                  {accountInfo && accountInfo.user.name}
                </h2>
                <p className="invite-header-description font-16">
                  You can now setup your account by inviting your team members.
                  Team members must have a domain email
                </p>
              </div>
              <InviteTeamMemberForm handleSuccess={this.goToProjects} />
            </div>

            <img
              src={LargeSlantBars}
              alt="background"
              className="large-slant-bars"
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requests, users, auth } = state;
  return {
    fullPageRequesting: requests.fullPageRequesting,
    user: auth.userData,
    accountInfo: users.accountInfo,
  };
}

export default connect(mapStateToProps)(InviteTeamMembers);
