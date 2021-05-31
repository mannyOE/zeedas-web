/* eslint-disable import/prefer-default-export */
import {
  REQUEST_STOP,
  REQUEST_START,
  FULL_PAGE_REQUEST_START,
  FULL_PAGE_REQUEST_STOP,
} from "./types";

function startRequest() {
  return { type: REQUEST_START, data: true };
}
function stopRequest() {
  return { type: REQUEST_STOP, data: false };
}
function startFullPageRequest() {
  return { type: FULL_PAGE_REQUEST_START, data: true };
}
function stopFullPageRequest() {
  return { type: FULL_PAGE_REQUEST_STOP, data: false };
}

export const requestActions = {
  startRequest,
  stopRequest,
  startFullPageRequest,
  stopFullPageRequest,
};
