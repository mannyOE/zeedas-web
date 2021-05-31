import React, { Component } from "react";
import { withRouter, Link, useParams } from "react-router-dom";
import ConfigRepository from "./_components/config-repository";
import ConfigSidebar from "./_components/config-sidebar";
import ConfigServer from "./_components/config-server";
import InfoPopover from "./_components/info-popover";
import ZeedasModal from "../../zeedas-components/modal";
import IconArrowBack from "../../zeedas-assets/icons/icon-arrow-back";
import PageLoader from "../../zeedas-components/page-loader";
import { credentialsServices } from "../../services/config-service";
import { notify } from "../../zeedas-components/bottom-notification";
import { store } from "../../state/redux/store";
import { history } from "../../state/history";
import { configActions } from "../../state/redux/config/actions";
import { appService } from "../project/apps/apps.services/index";
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_SUCCESS,
} from "../../constants/index";
import { APP_NEED_OPTIONS } from "../../utils/constants";
import colors from "../../utils/colors";
import "./_style/index.scss";
import CardComponent from "../../zeedas-components/card";
import { setPageTitle } from "state/redux/app-header/actions";

class Configuration extends Component {
  constructor() {
    super();
    const defaultButtonStyles = {
      padding: "0 15px",
      height: "38px",
      minWidth: "145px",
      backgroundColor: colors.ZEEDAS_BLUE,
      border: "2px solid rgba(26, 12, 47, 0.1)",
      color: colors.ZEEDAS_WHITE,
    };

    const menuItems = [
      {
        id: 1,
        title: "Repository",
        name: APP_NEED_OPTIONS.repo,
        subtitle: "Set repository for this app",
        component: (state, fetchAppCredentials, resetGitProvider) => (
          <ConfigRepository
            defaultButtonStyles={defaultButtonStyles}
            app={state.app}
            fetchAppCredentials={fetchAppCredentials}
            loadingApp={state.loadingApp}
            loadingCredentials={state.loadingCredentials}
            repoCredentials={state.appCredentials.repository || null}
            resetGitProvider={resetGitProvider}
            wasReset={state.wasReset}
            name="Reset Configuration"
          />
        ),
      },
      {
        id: 2,
        title: "Setup",
        name: APP_NEED_OPTIONS.server,
        subtitle: "Connect zeedas to your server",
        component: (state, fetchAppCredentials) => (
          <ConfigServer
            defaultButtonStyles={defaultButtonStyles}
            app={state.app}
            fetchAppCredentials={fetchAppCredentials}
            loadingApp={state.loadingApp}
            loadingCredentials={state.loadingCredentials}
            serverCredentials={state.appCredentials.server || null}
            name={state.app ? state.app.name : ""}
          />
        ),
      },
    ];
    this.state = {
      activeItem: menuItems[0],
      menuItems,
      app: {},
      loadingApp: false,
      loadingRepos: false,
      loadingCredentials: false,
      filteredMenuItems: [],
      appCredentials: {},
      hasCredentials: false,
      resetingCredentials: false,
      openModal: false,
      wasReset: false,
    };
  }

  getParams = (val) => this.props.match.params[val];

  componentDidMount() {
    const code = this.getCode();
    if (code) {
      this.handleRouting(code);
      return;
    }

    const { history, location, match } = this.props;
    const appId = this.getParams("appId");
    if (!appId) {
      const { config } = store.getState();
      if (config.savedRoute) {
        history.push(`${config.savedRoute}${location.search}`);
        this.getThisApp(config.activeAppId);
      }
    }

    this.getThisApp(appId);
    this.fetchAppCredentials();
  }

  getCode = () => new URLSearchParams(window.location.search).get("code");

  handleRouting = (code) => {
    const { config } = store.getState();
    const payload = { code };
    store.dispatch(configActions.setCode(payload));

    // eslint-disable-next-line react/prop-types
    history.push(`${config.savedRoute}`);
  };

  getThisApp = (id) => {
    this.setState({ loadingApp: true });
    appService.getSingleApp(id).then((res) => {
      const { response } = res;
      this.setState({ loadingApp: false });
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        this.setState(
          {
            app: response.data,
            hasCredentials: response.data && response.data.repos && true,
          },
          () => {
            // store.dispatch(setPageTitle(this.state.app.name));
            this.filterMenuItems();
          },
        );
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  fetchAppCredentials = () => {
    const appId = this.getParams("appId");
    this.setState({ loadingCredentials: true });
    credentialsServices.fetchAppCredentials(appId).then((res) => {
      const { response } = res;
      this.setState({ loadingCredentials: false, wasReset: false });
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        this.setState({ appCredentials: response.data });
      } else if (res.status === appConstants.ERROR_RESPONSE) {
      }
    });
  };

  resetGitProvider = (gitProvider) => {
    this.setState({ resetingGitProvider: true });
    const appId = this.getParams("appId");
    credentialsServices.resetGitProvider(appId, gitProvider).then((res) => {
      const { response } = res;
      this.setState({ resetingGitProvider: false });
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        this.setState({ appCredentials: response.data, wasReset: true });
        notify(response.message, NOTIFICATION_SUCCESS);
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  resetAppCredentials = () => {
    this.setState({ resetingCredentials: true });
    const appId = this.getParams("appId");
    credentialsServices.resetAppCredentials(appId).then((res) => {
      const { response } = res;
      this.setState({ resetingCredentials: false });
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        this.setState({ appCredentials: response.data, wasReset: true });
        notify(response.message, NOTIFICATION_SUCCESS);
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  filterMenuItems = () => {
    const { app, menuItems } = this.state;
    const filteredMenuItems = [];
    app.appNeed.forEach((need) => {
      const match = menuItems.find((item) => item.name === need.toLowerCase());
      if (match) filteredMenuItems.push(match);
    });
    this.setState({ filteredMenuItems });
  };

  handleTabChange = (activeItem, disabled) => {
    // const appId = this.getParams('appId');
    // this.fetchAppCredentials(appId);
    if (disabled) return;
    this.setState({ activeItem });
  };

  openModal = () => {
    this.setState({ openModal: true });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  render = () => {
    const { appCredentials, app } = this.state;
    const projectId = this.getParams("projectId");
    return (
      <div className="config-wrapper h-100">
        {this.state.loadingApp || this.getCode() ? (
          <PageLoader />
        ) : (
          <div className="my-4 d-flex flex-column h-100">
            <div className="mx-3 ">
              <Link
                to={`/project/${projectId}/apps`}
                className="config-back d-inline-flex align-items-center"
              >
                <IconArrowBack />
                <span className="mx-3">Back</span>
              </Link>
            </div>
            <div className="config-card mt-4 flex-grow-1 mb-5">
              <div className="row h-100">
                <div className="col-md-4 h-100">
                  <ConfigSidebar
                    handleTabChange={this.handleTabChange}
                    menuItems={this.state.filteredMenuItems}
                    activeItemId={this.state.activeItem.id}
                    disabled={
                      !appCredentials.repository
                      || !appCredentials.repository.some((item) => item.project)
                    }
                  />
                </div>

                {/* main */}
                <div className="col-md-8">
                  <div className="config-main p-5">
                    <div className="d-flex justify-content-between align-items-center">
                      <h1 className="app-name font-bold font-24 m-0">
                        {app.name}
                      </h1>
                      <div className="d-flex">
                        {appCredentials.repository
                          && appCredentials.repository.provider && (
                            <button
                              className="config-btn__secondary px-2 mr-3 py-1"
                              onClick={() => this.resetAppCredentials()}
                            >
                              Reset Configuration
                            </button>
                        )}
                        <InfoPopover id="info" />
                      </div>
                    </div>
                    {this.state.activeItem.component(
                      this.state,
                      this.fetchAppCredentials,
                      this.resetGitProvider,
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <ZeedasModal
          open={this.state.openModal}
          onClose={this.closeModal}
          title="Change Git Provider"
          width="35%"
        >
          <CardComponent borderRadius={'15px'}>
            <div
              className="pb-3 px-4 config"
              style={{ backgroundColor: 'white' }}
            >
              {this.state.menuItems[0].component(
                this.state,
                this.openModal,
                fetch
              )}
            </div>
          </CardComponent>
        </ZeedasModal> */}
      </div>
    );
  };
}

export default withRouter(Configuration);
