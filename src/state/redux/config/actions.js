import {
  SET_ACTIVE_APP,
  SET_CODE, RESET_CONFIG,
  SET_REVIEW_MODULE,
  SET_REVIEW_FILE,
  RESET_CODE_REVIEW, RESET_REVIEW_FILE, SET_REVIEW_FILE_DATA, RESET_REVIEW_FILE_DATA,
} from "./types";

import { repoServices } from "../../../services/config-service";
import { serviceHelpers } from "../../../utils/service-helpers";

const saveActiveApp = (payload) => ({ type: SET_ACTIVE_APP, payload });
const setCode = (payload) => ({ type: SET_CODE, payload });
const reset = () => ({ type: RESET_CONFIG });

const setReviewModule = (appId, moduleId) => (dispatch) => (
  repoServices
    .fetchModuleSubmissions(appId, moduleId)
    .then((response) => {
      dispatch({
        type: SET_REVIEW_MODULE,
        payload: {
          reviewModule: response.data,
        },
      });
      return Promise.resolve(response.data);
    })
    .catch((error) => Promise.reject(error))
);

const setReviewFile = (appId, moduleId, payload) => (dispatch) => {
  const stringifyAndEscape = (object) => {
    return JSON.stringify(object)
      .replace(/\\n/g, "\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, "\\\"")
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f")
      .replace(/{/g, "{\n")
      .replace(/},/g, "},\n")
      .replace(/}(?!,)/g, "}\n")
      .replace(/(?<!}),/g, ",\n");
  };

  let fileData = {};

  return repoServices
    .fetchFileFromModuleSubmissions(appId, moduleId, payload)
    .then((response) => {
      const { data } = response;
      fileData = data;
      const fileRequestConfig = { path: data.path };
      return serviceHelpers.genericRequest("get", data.download_url, fileRequestConfig);
      // if (data.type === "file") {
      // }
    })
    .then((rawFile) => {
      const reviewFile = typeof rawFile === "object" ? stringifyAndEscape(rawFile) : rawFile;
      fileData.contents = reviewFile;
      dispatch({
        type: SET_REVIEW_FILE,
        payload: {
          reviewFile: fileData,
        },
      });
      return Promise.resolve(rawFile);
    })
    .catch((error) => Promise.reject(error));
};

const setReviewFileData = (reviewFileData) => ({
  type: SET_REVIEW_FILE_DATA,
  payload: {
    reviewFileData,
  },
});

const resetReviewFile = () => ({ type: RESET_REVIEW_FILE });
const resetReviewFileData = () => ({ type: RESET_REVIEW_FILE_DATA });
const resetCodeReview = () => ({ type: RESET_CODE_REVIEW });

//
// SELECTORS
const getConfig = (state) => state.config;
const getCodeReview = (state) => state.config.codeReview;

export const configActions = {
  saveActiveApp,
  setCode,
  reset,
  setReviewModule,
  setReviewFile,
  setReviewFileData,
  resetReviewFile,
  resetReviewFileData,
  resetCodeReview,
};

export const configSelectors = {
  getConfig,
  getCodeReview,
};
