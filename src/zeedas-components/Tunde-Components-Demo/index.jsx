import React from "react";
import { Col, Row } from "reactstrap";
import ZeedasModal from "../modal";
import CardComponent from "../card";
import ZeedasInput from "../input";
import TabNavigation from "../tab-navigation";
import ZeedasBadge from "../badge";
import Colors from "../../utils/colors";
import { notify } from "../bottom-notification";
import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_INFO,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_WARNING,
} from "../../constants";

const tabNavigationTitles = [
  { tabId: 1, title: "Tab 1" },
  { tabId: 2, title: "Tab 2" },
  { tabId: 3, title: "Tab 3" },
  { tabId: 4, title: "Tab 4" },
];

const tabNavigationContents = [
  { contentId: 1, content: <h1>Tab 1</h1> },
  { contentId: 2, content: <h1>Tab 2</h1> },
  { contentId: 3, content: <h1>Tab 3</h1> },
  { contentId: 4, content: <h1>Tab 4</h1> },
];
class TundeComponentsDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          // flexDirection: "column",
        }}
      >
        <div className="container">
          <div className="mt-5">
            <hr />
            <h3>Input Component</h3>
            <p> Add description here</p>
          </div>
          <Row>
            <Col>
              <ZeedasInput label="Email address" placeholder="Hello there" />
            </Col>
          </Row>

          <div className="mt-5">
            <hr />
            <h3>Modal Component</h3>
            <p> Add description here</p>
          </div>
          <Row>
            <Col>
              <button type="button" onClick={this.openModal}>
                Open Modal
              </button>
              <ZeedasModal
                open={this.state.modalOpen}
                onClose={this.closeModal}
                title="Change Team Role"
                description="For Jane Foster"
              >
                <CardComponent>
                  <div>Hello There</div>
                </CardComponent>
              </ZeedasModal>
            </Col>
          </Row>

          <div className="mt-5">
            <hr />
            <h3>Tab Navigation Component</h3>
            <p>Add description here</p>
          </div>
          <Row>
            <Col>
              <TabNavigation
                tabNavigationTitles={tabNavigationTitles}
                tabNavigationContents={tabNavigationContents}
              />

              <ZeedasBadge
                color={Colors.ZEEDAS_BLUE}
                backgroundColor={Colors.ZEEDAS_FADED_BLUE}
                text="Visual Designer"
              />
            </Col>
          </Row>

          <div className="mt-5">
            <hr />
            <h3>Notifications</h3>
            <p>
              To use the notification component, import notify from the
              component.
              <br />
              It takes in two parameters: the message and the type.
              <br />
              There are four message types: "success", "warning", "failure",
              "info"
            </p>
          </div>
          <Row>
            <Col md="3">
              <button
                type="button"
                onClick={() => notify("this is info!", NOTIFICATION_INFO)}
              >
                Show Info Notification
              </button>
            </Col>
            <Col md="3">
              <button
                type="button"
                onClick={() => notify("this is success!", NOTIFICATION_SUCCESS)}
              >
                Show Success Notification
              </button>
            </Col>
            <Col md="3">
              <button
                type="button"
                onClick={() => notify("this is warning!", NOTIFICATION_WARNING)}
              >
                Show Warning Notification
              </button>
            </Col>
            <Col md="3">
              <button
                type="button"
                onClick={() => notify("this is failure!", NOTIFICATION_FAILURE)}
              >
                Show Failure Notification
              </button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TundeComponentsDemo;
