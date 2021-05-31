import { serviceHelpers } from "../utils/service-helpers";
import { AUTH_BASE_URL, ERROR_RESPONSE } from "../utils/constants";
import { notify } from "../zeedas-components/bottom-notification";
import { NOTIFICATION_FAILURE } from "../constants/index";

const CONFIG_BASE_URL = `${AUTH_BASE_URL}/config/credentials`;
const api = {
  CONFIG_SELECT_REPO_PROJECT: (gitProvider = "gitlab") => `${CONFIG_BASE_URL}/add-${gitProvider}-project`,

  CONFIG_FETCH_REPO_PROJECTS: (gitProvider = "gitlab", appId) => `${CONFIG_BASE_URL}/${gitProvider}-projects/${appId}`,

  INITIATE_REPO: (gitProvider = "gitlab") => `${CONFIG_BASE_URL}/${gitProvider}`,

  FETCH_APP_CREDENTIALS: (id) => `${CONFIG_BASE_URL}/fetch/${id}`,

  TEST_SERVER: `${CONFIG_BASE_URL}/server/test`,

  SAVE_SERVER_CONFIG: `${CONFIG_BASE_URL}/server/save`,

  RESET_APP_CREDENTIALS: (id) => `${CONFIG_BASE_URL}/reset/${id}`,

  RESET_GIT_PROVIDER: (id, gitProvider) => `${CONFIG_BASE_URL}/reset/${id}/${gitProvider}`,

  FETCH_SUBMISSIONS: (appId, moduleId) => `${CONFIG_BASE_URL}/fetch-submissions/${appId}/${moduleId}`,

  FETCH_SINGLE_FILE_DATA: (appId, moduleId) => `${CONFIG_BASE_URL}/fetch-a-file/${appId}/${moduleId}`,
};

export const fetchModuleSubmissions = (appId, moduleId) => (
  serviceHelpers.genericRequest("get", api.FETCH_SUBMISSIONS(appId, moduleId))
);

export const repoServices = {
  fetchModuleSubmissions: (appId, moduleId) => (
    serviceHelpers.genericRequest("get", api.FETCH_SUBMISSIONS(appId, moduleId))
  ),

  fetchFileFromModuleSubmissions: (appId, moduleId, payload) => (
    serviceHelpers.genericRequest("post", api.FETCH_SINGLE_FILE_DATA(appId, moduleId), payload)
  ),

  selectRepoProject: (gitProvider, payload) => {
    const url = api.CONFIG_SELECT_REPO_PROJECT(gitProvider);
    return serviceHelpers
      .postRequest(url, payload)
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
      })
      .catch((error) => {
        const errorMessage = serviceHelpers.interpretErrorResponse(error);
        notify(errorMessage, NOTIFICATION_FAILURE);
        return serviceHelpers.formatPromiseResponse(
          errorMessage,
          ERROR_RESPONSE,
        );
      });
  },

  fetchRepoProjects: (gitProvider, appId) => {
    const url = `${api.CONFIG_FETCH_REPO_PROJECTS(gitProvider, appId)}`;
    return serviceHelpers
      .getRequest(url)
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
      })
      .catch((error) => {
        const errorMessage = serviceHelpers.interpretErrorResponse(error);
        return serviceHelpers.formatPromiseResponse(
          errorMessage,
          ERROR_RESPONSE,
        );
      });
  },

  initiateRepo: (gitProvider, payload) => {
    const url = api.INITIATE_REPO(gitProvider);
    return serviceHelpers
      .postRequest(url, payload)
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
      })
      .catch((error) => {
        const errorMessage = serviceHelpers.interpretErrorResponse(error);
        return serviceHelpers.formatPromiseResponse(
          errorMessage,
          ERROR_RESPONSE,
        );
      });
  },
};

export const credentialsServices = {
  fetchAppCredentials: (id) => {
    const url = api.FETCH_APP_CREDENTIALS(id);
    return serviceHelpers
      .getRequest(url)
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
      })
      .catch((error) => {
        const errorMessage = serviceHelpers.interpretErrorResponse(error);
        return serviceHelpers.formatPromiseResponse(
          errorMessage,
          ERROR_RESPONSE,
        );
      });
  },
  resetAppCredentials: (id) => {
    const url = api.RESET_APP_CREDENTIALS(id);
    return serviceHelpers
      .patchRequest(url)
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
      })
      .catch((error) => {
        const errorMessage = serviceHelpers.interpretErrorResponse(error);
        return serviceHelpers.formatPromiseResponse(
          errorMessage,
          ERROR_RESPONSE,
        );
      });
  },

  resetGitProvider: (appId, gitProvider) => {
    const url = api.RESET_GIT_PROVIDER(appId, gitProvider);
    return serviceHelpers
      .patchRequest(url)
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
      })
      .catch((error) => {
        const errorMessage = serviceHelpers.interpretErrorResponse(error);
        return serviceHelpers.formatPromiseResponse(
          errorMessage,
          ERROR_RESPONSE,
        );
      });
  },
};

export const serverServices = {
  testServer: (payload) => {
    const url = api.TEST_SERVER;
    return serviceHelpers
      .postRequest(url, payload)
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
      })
      .catch((error) => {
        const errorMessage = serviceHelpers.interpretErrorResponse(error);

        notify(errorMessage, NOTIFICATION_FAILURE);

        return serviceHelpers.formatPromiseResponse(
          errorMessage,
          ERROR_RESPONSE,
        );
      });
  },

  saveServerConfig: (payload) => {
    const url = api.SAVE_SERVER_CONFIG;
    return serviceHelpers
      .postRequest(url, payload)
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
      })
      .catch((error) => {
        const errorMessage = serviceHelpers.interpretErrorResponse(error);
        return serviceHelpers.formatPromiseResponse(
          errorMessage,
          ERROR_RESPONSE,
        );
      });
  },
};
