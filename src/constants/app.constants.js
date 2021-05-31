export const appConstants = {
  USER_KEY: "persist:root",
  USER_SESSION_EXPIRED: "user-session-expired",
  USER_SESSION_ERROR: "user-session-error",
  USER_SESSION_UNAUTHORISED_ERROR_MESSAGE: "You do not have privilege to access page!",
  USER_SESSION_EXPIRED_MESSAGE: "Your session has expired!",
  USER_SESSION_AUTHENTICATION_REQUIRED_MESSAGE: "You need to login to access page!",
  APP_USER_SESSION_EXPIRED: "user-session-expired",
  APP_USER_SESSION_ERROR: "user-session-error",
  APP_USER_SESSION_UNAUTHORISED_ERROR_MESSAGE:
      "You do not have the permission to access page!",
  APP_USER_SESSION_UNAUTHORISED_ERROR_MESSAGE_2:
      "You have not been provision to access this system",
  APP_USER_SESSION_EXPIRED_MESSAGE: "Your session has expired!",
  APP_USER_SESSION_AUTHENTICATION_REQUIRED_MESSAGE:
      "You need to signin to access page!",
  APP_INTERNET_CONNECTION_MESSAGE: "Please Check your internet connectivity",
  INACTIVITY_EXPIRATION_LIMIT: 3600,
  // Action Types
  ADD_LOG: "add_log",
  OPEN_MODAL: "open_modal",
  CLOSE_MODAL: "close_modal",
  CLEAR_MODAL: "clear_modal",
  // API Status
  API_REQUEST_START: "API_REQUEST_START",
  API_REQUEST_FULL_PAGE_START: "API_REQUEST_FULL_PAGE_START",
  API_REQUEST_FINISH: "API_REQUEST_FINISH",
  REQUEST_SUCCESS: "REQUEST_SUCCESS",
  REQUEST_FAILURE: "REQUEST_FAILURE",
  GET_REQUEST: "get",
  POST_REQUEST: "post",

  NOTIFY_SUCCESS: "success",
  NOTIFY_ERROR: "error",
  NOTIFY_INFO: "info",
  NOTIFY_INVALID: "in",
  NOTIFY_WARNING: "warning",
  NOTIFY_DANGER: "danger",

  SUCCESS_RESPONSE: 1,
  ERROR_RESPONSE: 2,
  NOT_FOUND_RESPONSE: 3,

  SUCCESS: "ALERT_SUCCESS",
  ERROR: "ALERT_ERROR",
  CLEAR: "ALERT_CLEAR",

  ROLES_PAGES: {
    SUPER_ADMIN: ["*"],
    CLIENT_ADMIN: ["*"],
    CLIENT_USER: [],
    VGG_ADMIN: [],
    VGG_USER: [],
  },
  ROLES: [

  ],
  /* Environment Variables */
  WALLET_BASE_URL: process.env.REACT_APP_BASE_URL,
  // WALLET_BASE_URL: "https://api-development.zeedas.com",
  // WALLET_BASE_URL: process.env.REACT_APP_BILLING_BASE_URL,
  Account: "5eebcb4f1c814f38c7f1b21d",
  // TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiN…DY4fQ.CI-q9hFSjfit_qVV1iNxkK-W-ckD2kaMmvGON62ddgo",
  /* WALLET */
  OPEN_EXCHANGE_RATE_APP_ID: "2e232df3c7ab46b998f733d6fc1bc59a",
  IP_STACK_ACCESS_KEY: "c44a2d52138dc93b131f8cfd3ba8c382",
  PAYSTACK_PUBLIC_KEY: "pk_test_7769641a9a47606814c1f0c3fb77d438cc59127d",
};
