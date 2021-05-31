import {
  MODULE_DELETE,
  MODULE_CREATE,
  MODULE_UPDATE,
  MODULES_FETCHING,
  MODULES_FETCHING_DONE,
  MODULES_FETCHING_ERROR,
  MODULE_CREATE_DONE,
  MODULE_CREATE_ERROR,
  MODULE_DELETE_DONE,
  MODULE_DELETE_ERROR,
  MODULE_UPDATE_DONE,
  MODULE_UPDATE_ERROR,
  FETCH_APP,
  FETCH_APP_DONE,
  FETCH_APP_ERROR,
  MODULE_PUBLISH,
  MODULE_PUBLISH_DONE,
  MODULE_PUBLISH_ERROR,
} from "./types";

const initialState = {
  module: [],
  app: null,
  appIsFetching: false,
  appError: null,
  isFetching: false,
  error: null,
  isPublishing: false,
};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case MODULES_FETCHING: {
      return { ...state, isFetching: true, error: null };
    }
    case MODULES_FETCHING_DONE: {
      return {
        ...state, module: payload, isFetching: false, error: null,
      };
    }
    case MODULES_FETCHING_ERROR: {
      return { ...state, error: payload, isFetching: false };
    }
    case MODULE_CREATE: {
      return { ...state, isFetching: true, error: null };
    }
    case MODULE_CREATE_DONE: {
      return {
        ...state, module: [payload, ...state.module], isFetching: false, error: null,
      };
    }
    case MODULE_CREATE_ERROR: {
      return { ...state, error: payload, isFetching: false };
    }
    case MODULE_UPDATE: {
      return { ...state, isFetching: true, error: null };
    }
    case MODULE_UPDATE_DONE: {
      return {
        ...state, module: payload, isFetching: false, error: null,
      };
    }
    case MODULE_UPDATE_ERROR: {
      return { ...state, error: payload, isFetching: false };
    }
    case MODULE_DELETE: {
      return { ...state, isFetching: true, error: null };
    }
    case MODULE_DELETE_DONE: {
      return {
        ...state, module: payload, isFetching: false, error: null,
      };
    }
    case MODULE_DELETE_ERROR: {
      return { ...state, error: payload, isFetching: false };
    }
    case FETCH_APP_ERROR: {
      return { ...state, appError: payload, appIsFetching: false };
    }
    case FETCH_APP: {
      return { ...state, appIsFetching: true };
    }
    case FETCH_APP_DONE: {
      return {
        ...state, appIsFetching: false, app: payload, appError: null,
      };
    }
    case MODULE_PUBLISH: {
      return { ...state, isPublishing: true };
    }
    case MODULE_PUBLISH_DONE: {
      return { ...state, isPublishing: false, error: null };
    }
    case MODULE_PUBLISH_ERROR: {
      return { ...state, error: payload, isPublishing: false };
    }
    default: {
      return state;
    }
  }
};
