import React from "react";
import { Row, Col } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Card from "./card";
import NoList from "./member-profile/_components/no-list";
import SingleActivity from "../pages/project/modules/_components/module-comments/_components/single-activity";

const Comment = ({ comment }) => <div className="comment-bg">{comment}</div>;

const ActivityItem = ({ activity }) => (
  <div className="my-4 activity-item">
    <div className="d-flex">
      <img src="" alt="" />
    </div>
    <div>
      <Row className="align-items-center my-2">
        <Col md="8" className="d-flex align-items-center">
          <img
            alt="avatar"
            src={activity.avatar}
            className="rounded-circle mr-2"
            height="30"
          />
          <p className="name">{activity.name}</p>
        </Col>
        <Col md="4" className="text-right">
          <p className="timestamp">{activity.timestamp}</p>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <p className="action">
            <span className="font-bold">{activity.action}</span>
            {" "}
            {activity.task}
          </p>
          {activity.comment && <Comment comment={activity.comment} />}
        </Col>
      </Row>
    </div>
  </div>
);

const ActivityTimeline = ({ title, activities, className }) => (
  <div className={`${className}`}>
    <Card className="p-3">
      <h3 className="activities-title">{title}</h3>
      <hr />
      {/* <div style={{ height: "600px" }}> */}
      {/* <PerfectScrollbar> */}
      {activities.length < 1 ? (
        <NoList message="No activities yet" />
      ) : (
        <div>
          {activities.map((activity, index) => (
            // <ActivityItem activity={activity} />
            <SingleActivity commentData={activity} />
          ))}
        </div>
      )}

       {/* </PerfectScrollbar> */}
      {/* </div> */}
    </Card>
  </div>
);

export default ActivityTimeline;
