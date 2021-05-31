import {
  SET_ACTIVE_APP,
  SET_CODE,
  RESET_CONFIG,
  SET_REVIEW_MODULE,
  SET_REVIEW_FILE,
  RESET_REVIEW_FILE,
  RESET_CODE_REVIEW,
  SET_REVIEW_FILE_DATA, RESET_REVIEW_FILE_DATA,
} from "./types";

const INIT_STATE = {
  savedRoute: null,
  activeGitProvider: null,
  connectingToRepo: false,
  code: null,
  codeReview: {
    reviewModule: null,
    reviewFile: null,
    reviewFileData: null,
  },
};

const config = (state = INIT_STATE, action) => {
  // const {activeAppId, connectingToRepo, activeRepoManager } = action.payload
  switch (action.type) {
    case SET_ACTIVE_APP:
      return {
        ...state,
        savedRoute: action.payload.savedRoute,
        activeGitProvider: action.payload.activeGitProvider,
        connectingToRepo: action.payload.connectingToRepo,
      };

    case SET_CODE:
      return {
        ...state,
        code: action.payload.code,
      };

    case SET_REVIEW_MODULE:
      return {
        ...state,
        codeReview: {
          reviewFile: state.codeReview.reviewFile,
          reviewFileData: state.codeReview.reviewFileData,
          reviewModule: action.payload.reviewModule,
        },
      };

    case SET_REVIEW_FILE:
      return {
        ...state,
        codeReview: {
          reviewModule: state.codeReview.reviewModule,
          reviewFileData: state.codeReview.reviewFileData,
          reviewFile: action.payload.reviewFile,
        },
      };

    case SET_REVIEW_FILE_DATA:
      return {
        ...state,
        codeReview: {
          reviewModule: state.codeReview.reviewModule,
          reviewFile: state.codeReview.reviewFile,
          reviewFileData: action.payload.reviewFileData,
        },
      };

    case RESET_REVIEW_FILE:
      return {
        ...state,
        codeReview: {
          reviewModule: state.codeReview.reviewModule,
          reviewFileData: state.codeReview.reviewFileData,
          reviewFile: INIT_STATE.codeReview.reviewFile,
        },
      };

    case RESET_REVIEW_FILE_DATA:
      return {
        ...state,
        codeReview: {
          reviewModule: state.codeReview.reviewModule,
          reviewFile: state.codeReview.reviewFile,
          reviewFileData: INIT_STATE.codeReview.reviewFileData,
        },
      };

    case RESET_CODE_REVIEW:
      return {
        ...state,
        codeReview: INIT_STATE.codeReview,
      };

    case RESET_CONFIG:
      return INIT_STATE;

    default:
      return state;
  }
};

export default config;
