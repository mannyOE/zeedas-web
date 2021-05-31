import {
  AUTH_BASE_URL,
  APP_SERVICE,
  ERROR_RESPONSE,
} from "../../../../utils/constants";
import { serviceHelpers } from "../../../../utils/service-helpers";

function getApps(projectId) {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}${APP_SERVICE}?projectId=${projectId}`)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}

function getSkills() {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}/project-service/skill`)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}

function createApp(payload) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}${APP_SERVICE}`, payload)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}

function updateApp(payload, id) {
  return serviceHelpers
    .putRequest(`${AUTH_BASE_URL}${APP_SERVICE}/${id}`, payload)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}

function deleteApp(id) {
  return serviceHelpers
    .deleteRequest(`${AUTH_BASE_URL}${APP_SERVICE}/${id}`)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}

function getSingleApp(appId) {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}${APP_SERVICE}/${appId}`)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}

// eslint-disable-next-line import/prefer-default-export
export const appService = {
  createApp,
  getApps,
  getSkills,
  updateApp,
  deleteApp,
  getSingleApp,
};
