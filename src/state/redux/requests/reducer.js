import {
  REQUEST_START,
  REQUEST_STOP,
  FULL_PAGE_REQUEST_START,
  FULL_PAGE_REQUEST_STOP,
} from "./types";

const INIT_STATE = {
  requesting: false,
  fullPageRequesting: false,
};

export default function requests(state = INIT_STATE, action) {
  switch (action.type) {
    case REQUEST_START:
      return { ...state, requesting: action.data };
    case REQUEST_STOP:
      return { ...state, requesting: action.data };
    case FULL_PAGE_REQUEST_START:
      return { ...state, fullPageRequesting: action.data };
    case FULL_PAGE_REQUEST_STOP:
      return { ...state, fullPageRequesting: action.data };
    default:
      return state;
  }
}
