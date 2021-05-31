import React from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import ActivityTimeline from "zeedas-components/activity-timeline";
import { usersActions } from "../../state/redux/users/actions";
import PageLoader from "../page-loader";
import ProfileDetails from "./_components/profile-details/index";
import TasksOverview from "./_components/tasks-overview/index";
import TasksBreakdown from "./_components/tasks-breakdown/index";
import "./style.scss";
import { comment } from "../../state/redux/comment/actions";
// mock data for activity timeline
// type, picture, name, time, action, task, comment (optional)
const activities = [
  {
    type: "comment",
    avatar: "/images/profile/lady.jpg",
    name: "Peter Keen",
    timestamp: "10:30 am",
    action: "Commented on this task",
    task: "Interview with Users",
    comment:
      "@prince what do you think about spliting these users we are talking to into two groups",
  },
  {
    type: "completed",
    avatar: "/images/profile/lady.jpg",
    name: "Peter Keen",
    timestamp: "10:30 am",
    action: "Completed this task",
    task: "Figma UI Kit Development",
  },
  {
    type: "attachment",
    avatar: "/images/profile/lady.jpg",
    name: "Peter Keen",
    timestamp: "10:30 am",
    action: "Commented on this task",
    task: "Interview with Users",
    comment:
      "@prince what do you think about spliting these users we are talking to into two groups",
  },
  {
    type: "attachment",
    avatar: "/images/profile/lady.jpg",
    name: "Peter Keen",
    timestamp: "10:30 am",
    action: "Commented on this task",
    task: "Interview with Users",
    comment:
      "@prince what do you think about spliting these users we are talking to into two groups",
  },
  {
    type: "attachment",
    avatar: "/images/profile/lady.jpg",
    name: "Peter Keen",
    timestamp: "10:30 am",
    action: "Commented on this task",
    task: "Interview with Users",
    comment:
      "@prince what do you think about spliting these users we are talking to into two groups",
  },
];

class MemberProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const pathArray = window.location.pathname.split("/");
    // const accountId = pathArray[pathArray.length - 1];
    // this.setState({ accountId, path: "" });
    // this.props.dispatch(usersActions.fetchTeamMemberProfile(accountId));

    // const fetchUserActivity = () => {
    //   if (profileData in this.props) {
    //     const { profileData } = this.props;
    //     this.getUserActivity(profileData.user._id);
    //   } else {
    //     setTimeout(fetchUserActivity, 1000);
    //   }
    // };

    this.getUserActivity();
  }

  getUserActivity = () => {
    const { profileData } = this.props;

    if (profileData) {
      const { $fetchUserActivity } = this.props;
      $fetchUserActivity("user", profileData.user._id);
    } else {
      setTimeout(this.getUserActivity, 1000);
    }
  };

  render() {
    const { profileData, comment: commentData } = this.props;

    const monitoredActivities = [];
    commentData.allActivities.forEach((activity, index) => {
      if (Array.isArray(activity)) {
        if (index === activity.length - 1) {
          monitoredActivities.concat(activity);
        }
      } else {
        monitoredActivities.push(activity);
      }
    });
    // if (fullPageRequesting) {
    //   return <PageLoader />;
    // }

    return (
      <div className="container-fluid h-100">
        <div className="MemberProfile px-5">
          <Row className="h-100">
            <Col md="3" className="px-0 h-100">
              {profileData && <ProfileDetails profileData={profileData} className="ProfileDetails h-100 overflow-auto" />}
            </Col>
            <Col md="5" className="h-100 d-flex flex-column">
              <TasksOverview className="mb-3 TasksOverview" />
              <TasksBreakdown className="mb-3 TasksBreakdown flex-grow-1 overflow-auto" />
            </Col>
            <Col md="4" className="activities-body px-0 h-100">
              <ActivityTimeline
                title="Real Time Activities"
                // activities={activities}
                activities={monitoredActivities}
                className="ActivityTimeline h-100 overflow-auto"
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { } = state;
  return {
    ...state,
    commentAction: comment,
  };
}

const mapDispatch = (dispatch) => ({
  $fetchUserActivity: (user, userId) => dispatch(comment.fetchActivities(user, userId)),
});

export default connect(mapStateToProps, mapDispatch)(MemberProfile);
