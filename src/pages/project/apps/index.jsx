import React, { Component } from "react";
import "./style.scss";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import {
  BrowserRouter, Route, Switch, withRouter,
} from "react-router-dom";
import AppNav from "./_components/app-nav";
import SingleApp from "./_components/single-app";
import ZeedasFullModal from "../../../zeedas-components/full-modal";
import ZeedasModal from "../../../zeedas-components/modal";
import ActionMessage from "../../../zeedas-components/action-message";
import EmptyRecordMessage from "../../../zeedas-components/empty-record-message";
import IconDeleteAlt from "../../../zeedas-assets/icons/icon-delete-alt";
import CreateApp from "./_components/create-app";
import EditApp from "./_components/edit-app";
import PageLoader from "../../../zeedas-components/page-loader";
import { appService } from "./apps.services";
import { notify } from "../../../zeedas-components/bottom-notification";
import App from "../../../app";
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_INFO,
  NOTIFICATION_SUCCESS,
} from "../../../constants";

export class Apps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateAppModal: false,
      openEditAppModal: false,
      openDeleteAppModal: false,
      AppDescription: false,
      skillsContainer: true,
      apps: [],
      app: {},
      skills: [],
      projectId: "",
      requesting: true,
      deleteConfirmationText: "",
      isRequestingDelete: false,
    };
  }

  async componentDidMount() {
    const { projectId } = this.props;
    // const pathArray = window.location.pathname.split("/");
    // const id = pathArray[pathArray.length - 1];
    await this.setState({ projectId });
    await this.getApps();
    await this.getSkills();
  }

  getApps = () => {
    /* Direct */
    this.setState({ requesting: true });
    appService.getApps(this.state.projectId)
      .then((res) => {
        const { response } = res;

        if (res.status === appConstants.SUCCESS_RESPONSE) {
          this.setState({ apps: response.data.data });
          this.setState({ requesting: false });
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          // window.alert(response.message);
          notify(response.message, NOTIFICATION_FAILURE);
        }
      });
  };

  getSkills = () => {
    /* Direct */
    appService.getSkills().then((res) => {
      const { response } = res;

      if (res.status === appConstants.SUCCESS_RESPONSE) {
        this.setState({ skills: response.data.data });
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        // window.alert(response.message);
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  toggleDescreption = () => {
    this.setState((prevState) => ({
      AppDescription: !prevState.AppDescription,
    }));
  };

  toggleSkills = () => {
    this.setState((prevState) => ({
      skillsContainer: !prevState.skillsContainer,
    }));
  };

  openCreateApp = () => {
    this.setState({ openCreateAppModal: true });
  };

  closeCreateAppModal = () => {
    this.setState({ openCreateAppModal: false });
  };

  openEditApp = (app) => {
    this.setState({ app, openEditAppModal: true });
  };

  closeEditAppModal = () => {
    this.setState({ openEditAppModal: false });
  };

  closeDeleteAppModal = () => {
    this.setState({
      openDeleteAppModal: false,
      deleteConfirmationText: "",
    });
  };

  openDeleteApp = (app) => {
    this.setState({ app, openDeleteAppModal: true });
  };

  setDeleteConfirmationText = (event) => {
    this.setState({ deleteConfirmationText: event.target.value })
  }

  deleteApp = () => {
    this.setState({ isRequestingDelete: true });
    appService.deleteApp(this.state.app._id)
      .then((res) => {
        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          notify(response.message, NOTIFICATION_SUCCESS);
          // setRequesting(false);
          this.getApps();
          this.closeDeleteAppModal();
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          // window.alert(response.message);
          notify(response.message, NOTIFICATION_FAILURE);
        }
      })
      .finally(() => {
        this.setState({
          isRequestingDelete: false,
          deleteConfirmationText: "",
        });
      });
  };

  render() {
    const {
      openCreateAppModal,
      openEditAppModal,
      AppDescription,
      skillsContainer,
      openDeleteAppModal,
      apps,
      app,
      skills,
      projectId,
      requesting,
      deleteConfirmationText,
      isRequestingDelete,
    } = this.state;

    if (requesting) {
      return <PageLoader />;
    }

    return (
      <>
        {!apps.length && (
          <div className="d-flex align-items-center justify-content-center h-100">
            <div className="">
              <EmptyRecordMessage
                callAction={this.openCreateApp}
                display="none"
                width={194}
                textWidth="336px"
                message="You don't have any App Created yet"
                btnText="Create New App"
                showActionButton
                className="d-flex flex-column align-items-center"
              />
            </div>
          </div>
        )}
        <div className="ProjectApps">
          <Row style={{ padding: "0 0.7rem", marginTop: "20px" }}>
            <Col lg={{ size: 12 }}>
              {apps.length > 0 && (
                <>
                  <Row>
                    <Col md={12}>
                      <AppNav openCreateApp={this.openCreateApp} />
                    </Col>
                  </Row>
                  <Row>
                    {apps.map((app) => (
                      <Col lg={3} md={4} key={app._id} className="relative">
                        <SingleApp
                          app={app}
                          projectId={projectId}
                          openEditApp={() => this.openEditApp(app)}
                          openDeleteApp={() => this.openDeleteApp(app)}
                        />
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </Col>
            <Col>
              <ZeedasModal
                open={openEditAppModal}
                onClose={this.closeEditAppModal}
                title="Edit Name & Description"
                description={`For ${app.name}`}
                width={
                  window.innerWidth >= 1200
                    ? "35%"
                    : window.innerWidth >= 768
                      ? "50%"
                      : window.innerWidth < 600
                        ? "100%"
                        : "33%"
                }
              >
                <EditApp
                  app={app}
                  getApps={this.getApps}
                  closeModal={this.closeEditAppModal}
                />
              </ZeedasModal>
              <ZeedasModal
                open={openDeleteAppModal}
                onClose={this.closeDeleteAppModal}
                title="Delete App"
                description={`For ${app.name}`}
                width="35%"
              >
                <ActionMessage
                  question="Are you sure you want to Delete this App ?"
                  info="This App will be deleted and can never be retrieved."
                  proceedText="Delete this App"
                  btnProceedColor="zd-dark-pink"
                  icon={<IconDeleteAlt fill="#fff" />}
                  onClickProceed={this.deleteApp}
                  onClickCancel={this.closeDeleteAppModal}
                  canConfirm={deleteConfirmationText === app.name}
                  confirmationInput={deleteConfirmationText}
                  placeholder="Enter the name of this app to confirm"
                  onConfirmationInputChange={this.setDeleteConfirmationText}
                  requesting={isRequestingDelete}
                  proceedButtonStyle={{
                    width: "170px",
                  }}
                />
              </ZeedasModal>
              <ZeedasFullModal
                open={openCreateAppModal}
                onClose={this.closeCreateAppModal}
                width={
                  window.innerWidth >= 768
                    ? "50%"
                    : window.innerWidth < 600
                      ? "100%"
                      : "33%"
                }
              >
                <CreateApp
                  getApps={this.getApps}
                  skills={skills}
                  projectId={projectId}
                  toggleDescreption={this.toggleDescreption}
                  toggleSkills={this.toggleSkills}
                  skillsContainer={skillsContainer}
                  AppDescription={AppDescription}
                  closeModal={this.closeCreateAppModal}
                />
              </ZeedasFullModal>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
export default withRouter(Apps);
