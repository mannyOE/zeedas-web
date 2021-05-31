import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Label } from "reactstrap";
import {
  GITHUB_AUTH_LINK,
  BITBUCKET_AUTH_LINK,
  GITLAB_AUTH_LINK,
} from "../../../utils/constants";

import colors from "../../../utils/colors";
import RadioButtonSm from "./radio-button-sm";
import GitlabIcon from "./icon-gitlab";
import BitbucketIcon from "./icon-bitbucket";
import GithubIcon from "./icon-github";
import SelectOption from "./select-option";
import "../_style/radio-button-sm.scss";
import GithubIconWhite from "../../../zeedas-assets/icons/icon-github-white";
import BitbucketIconWhite from "../../../zeedas-assets/icons/icon-bitbucket-white";
import GitlabIconWhite from "../../../zeedas-assets/icons/icon-gitlab-white";
import { repoServices } from "../../../services/config-service";
import DefaultButton from "../../../zeedas-components/default-button";
import { configActions } from "../../../state/redux/config/actions";
import { store } from "../../../state/redux/store";
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_SUCCESS,
} from "../../../constants/index";
import { notify } from "../../../zeedas-components/bottom-notification";
import "../_style/index.scss";

/* ***** */

/* ***** */
class ConfigRepository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProvider: {},
      connectedToGitProvider: false,
      selectedProviderCredentials: {},
      repos: [],
      loading: false,
      fetchingRepoProjects: false,
      gitProviders: [
        {
          label: (
            <span className="radio-button__label d-flex align-items-center ml-2">
              <GithubIcon />
              <span className="ml-2">Github</span>
            </span>
          ),
          authLink: GITHUB_AUTH_LINK,
          buttonIcon: <GithubIconWhite />,
          value: "github",
          name: "Github",
          id: 1,
          repos: null,
          selectedRepo: {
            value: "",
            label: "",
          },
        },
        {
          label: (
            <span className="radio-button__label d-flex align-items-center ml-2">
              <BitbucketIcon />
              <span className="ml-2">Bitbucket</span>
            </span>
          ),
          authLink: BITBUCKET_AUTH_LINK,
          buttonIcon: <BitbucketIconWhite />,
          value: "bitbucket",
          name: "Bitbucket",
          id: 2,
          repos: null,
          selectedRepo: {
            value: "",
            label: "",
          },
        },
        {
          label: (
            <span className="radio-button__label d-flex align-items-center ml-2">
              <GitlabIcon />
              <span className="ml-2">Gitlab</span>
            </span>
          ),
          authLink: GITLAB_AUTH_LINK,
          buttonIcon: <GitlabIconWhite />,
          value: "gitlab",
          name: "Gitlab",
          id: 3,
          repos: null,
          selectedRepo: {
            value: "",
            label: "",
          },
        },
      ],
    };
  }

  /* ***** */
  componentDidMount = () => {
    this.setState({ selectedProvider: this.state.gitProviders[0] });
    const { config } = store.getState();
    if (config.code) {
      const selectedProvider = this.state.gitProviders.find(
        (provider) => config.activeGitProvider === provider.value
      );
      this.setState({ selectedProvider }, () => {
        this.initiateRepository(config.code);
      });
      return;
    }
    this.setRepos();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.wasReset && this.props.wasReset !== prevProps.wasReset) {
      const selectedRepo = {
        value: "",
        label: "",
      };
      this.setState({ selectedRepo });
    }

    if (this.props.repoCredentials !== prevProps.repoCredentials) {
      this.setRepos();
    }
  };

  initiateRepository = (code) => {
    const gitProviderName = this.state.selectedProvider.value;
    const app = this.props.match.params.appId;
    // eslint-disable-next-line react/prop-types
    const payload = {
      code,
      redirect_uri: "https://qa.zeedas.com/app",
      app,
    };
    this.setState({ loading: true });
    repoServices.initiateRepo(gitProviderName, payload).then((res) => {
      const { response } = res;
      this.setState({ loading: false });
      store.dispatch(configActions.reset());
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        let repos = [];
        if (response.data.length > 0) {
          repos = response.data.map((item) => {
            const { id, name } = item;
            item.value = id;
            item.label = name;
            delete item.id;
            delete item.name;
            return item;
          });
        }
        this.setState({ connectedToGitProvider: true, repos });
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  setRepos = () => {
    const { repoCredentials } = this.props;
    if (repoCredentials && repoCredentials.length) {
      const defaultRepo = repoCredentials.find((item) => item.default);
      if (defaultRepo) {
        this.setSelectedProvider(defaultRepo.provider);
        this.setState({
          connectedToGitProvider: true,
        });
        this.fetchRepoProjects();
      }
    }
  };

  setSelectedProvider = (provider) => {
    const { repoCredentials } = this.props;
    const selectedProviderCredentials = repoCredentials.find(
      (item) => item.provider === provider
    );
    const selectedProvider = this.state.gitProviders.find(
      (item) => item.value === provider
    );
    this.setState(
      {
        selectedProvider,
        selectedProviderCredentials: selectedProviderCredentials || {},
      },
      () => {
        if (
          selectedProviderCredentials.accessToken &&
          selectedProvider.repos === null
        )
          this.fetchRepoProjects(provider);
      }
    );
  };

  fetchRepoProjects = (provider) => {
    const { repoCredentials } = this.props;
    const { appId } = this.props.match.params;
    this.setState({ fetchingRepoProjects: true, repos: [] });
    repoServices.fetchRepoProjects(provider, appId).then((res) => {
      const { response } = res;
      this.setState({ fetchingRepoProjects: false });
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        let repos = [];
        if (response.data.length > 0) {
          repos = response.data.map((item) => {
            const { id, name, url } = item;
            item.value = id;
            item.label = name;
            item.url = url;
            delete item.id;
            delete item.name;
            return item;
          });
        }
        const gitProviders = [...this.state.gitProviders];
        const selectedProviderIndex = gitProviders.findIndex(
          (item) => item.value === provider
        );
        gitProviders[selectedProviderIndex].repos = repos;
        gitProviders[selectedProviderIndex].selectedRepo = repos.find(
          (repo) => repo.url === this.state.selectedProviderCredentials.url
        );
        console.log(this.state.selectedProviderCredentials.url)
        console.log(repos)
        this.setState({ gitProviders });
        this.setActiveRepo(repos);
      } else if (res.status === appConstants.ERROR_RESPONSE) {
      }
    });
  };

  setActiveRepo = (repos) => {
    const { repoCredentials } = this.props;
    const selectedRepo = repos.find(
      (repo) => `${repo.value}` === `${repoCredentials.project}`
    );
    if (selectedRepo) this.setState({ selectedRepo });
  };

  handleProviderConnection = () => {
    const { selectedProvider } = this.state;
    const payload = {
      savedRoute: window.location.pathname,
      activeGitProvider: selectedProvider.value,
      isConnecting: true,
    };
    store.dispatch(configActions.saveActiveApp(payload));
    window.open(this.state.selectedProvider.authLink, "_self");
  };

  selectRepo = () => {
    const gitProviderName = this.state.selectedProvider.value;
    const { app, fetchAppCredentials } = this.props;
    const payload = {
      project: this.state.selectedRepo.value,
      app: app._id,
    };
    this.setState({ loading: true });
    repoServices.selectRepoProject(gitProviderName, payload).then((res) => {
      const { response } = res;
      this.setState({ loading: false });
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        notify(response.message, NOTIFICATION_SUCCESS);
        fetchAppCredentials(app._id);
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  /* ***** */
  resetConnection = () => {
    this.setState({ connectedToGitProvider: false });
  };

  handleInputChange = (e, id) => {
    this.setSelectedProvider(id);
  };

  handleChange = (selectedRepo) => {
    this.setState({ selectedRepo });
  };

  /* ***** */
  render() {
    const {
      defaultButtonStyles,
      app,
      loadingCredentials,
      repoCredentials,
      wasReset,
    } = this.props;
    const {
      connectedToGitProvider,
      selectedProviderCredentials,
      selectedProvider,
      selectedRepo,
      loading,
      fetchingRepoProjects,
      gitProviders,
    } = this.state;
    return (
      <>
        {selectedProvider.selectedRepo && (
          <form className="mt-5">
            {/* Select repo */}
            <div className="repo-managers">
              <div className="d-flex">
                {gitProviders.map((provider) => (
                  <div className="mr-5" key={provider.id}>
                    <RadioButtonSm
                      name="repo-manager"
                      label={provider.label}
                      id={provider.value}
                      value={provider.value}
                      checked={selectedProvider.value === provider.value}
                      onChange={this.handleInputChange}
                    />
                  </div>
                ))}
              </div>
            </div>
            {selectedProvider.repos === null ? (
              <div className="connect-btn mt-4">
                <button
                  type="button"
                  disabled={loadingCredentials}
                  className="d-inline-flex align-items-center px-4"
                  onClick={() => this.handleProviderConnection()}
                >
                  {selectedProvider.buttonIcon}
                  <span className="ml-4 font-14 font-bold">
                    {!loadingCredentials
                      ? `Connect to your ${selectedProvider.name} Account`
                      : "Connecting..."}
                  </span>
                </button>
              </div>
            ) : fetchingRepoProjects ? (
              <div className="mt-5">
                <p
                  className="default-input-label text-center"
                  style={{ opacity: 0.4 }}
                >
                  Fetching {selectedProvider.name} projects...
                </p>
              </div>
            ) : (
              <>
                <div className="mt-4">
                  <Label
                    className="default-input-label d-block"
                    style={{ marginBottom: "1rem" }}
                  >
                    Repository
                  </Label>
                  <SelectOption
                    onChange={this.handleChange}
                    options={selectedProvider.repos}
                    bgColor={colors.ZEEDAS_INPUT_GREY}
                    border={colors.ZEEDAS_INPUT_GREY}
                    placeholderColor={colors.ZEEDAS_INPUT_GREY}
                    value={selectedProvider.selectedRepo}
                  />
                </div>
                <div className="mt-5">
                  <DefaultButton
                    disabled={loading || !selectedProvider.selectedRepo.value}
                    onClick={this.selectRepo}
                    style={{
                      ...defaultButtonStyles,
                    }}
                  >
                    <span> {loading ? "Saving..." : "Save"}</span>
                  </DefaultButton>
                  {/* <a
                  href="#"
                  className="ml-4"
                  onClick={() => changeGitProvider()}
                >
                  Change git provider
                </a> */}
                </div>
              </>
            )}
          </form>
        )}
      </>
    );
  }
}

/* ***** */

ConfigRepository.propTypes = {
  // defaultButtonStyles: PropTypes.func.isRequired,
  // match: PropTypes.func.isRequired,
  // location: PropTypes.func.isRequired,
  // history: PropTypes.func.isRequired,
};

/* ***** */
export default withRouter(ConfigRepository);
