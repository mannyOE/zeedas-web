/* eslint-disable import/prefer-default-export */
import { serviceHelpers } from "../utils/service-helpers";
import {
  USER_MGT,
  AUTH_BASE_URL,
  AUTH_LOGIN,
  ERROR_RESPONSE,
  AUTH_SIGNUP,
  AUTH_FORGOT_PASSWORD,
  AUTH_VERIFY_COMPANY,
  AUTH_VERIFY_ACCOUNT,
  AUTH_RESET_PASSWORD,
  AUTH_RESEND_VERIFICATION,
  AUTH_GOOGLE_LOGIN,
  AUTH_GOOGLE_SIGNUP,
  AUTH_SLACK_SIGNUP,
  AUTH_SLACK_LOGIN, AUTH_RECOVER_TEAMS,
} from "../utils/constants";

async function login(payload) {
  return serviceHelpers
    // TODO: CHANGE WHEN AUTH_BASE_URL CHANGES - MEL
    .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_LOGIN}`, payload)
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

function loginWithGoogle(payload) {
  return serviceHelpers
    // TODO: CHANGE WHEN AUTH_BASE_URL CHANGES - MEL
    .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_GOOGLE_LOGIN}`, payload)
    // .postRequest(`${AUTH_BASE_URL}${AUTH_GOOGLE_LOGIN}`, payload)
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

function registerWithGoogle(payload) {
  return serviceHelpers
    // TODO: CHANGE WHEN AUTH_BASE_URL CHANGES - MEL
    .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_GOOGLE_SIGNUP}`, payload)
    // .postRequest(`${AUTH_BASE_URL}${AUTH_GOOGLE_SIGNUP}`, payload)
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

function loginWithSlack(payload) {
  return serviceHelpers
    // TODO: CHANGE WHEN AUTH_BASE_URL CHANGES - MEL
    .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_SLACK_LOGIN}`, payload)
    // .postRequest(`${AUTH_BASE_URL}${AUTH_SLACK_LOGIN}`, payload)
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

function registerWithSlack(payload) {
  return serviceHelpers
    // TODO: CHANGE WHEN AUTH_BASE_URL CHANGES - MEL
    .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_SLACK_SIGNUP}`, payload)
    // .postRequest(`${AUTH_BASE_URL}${AUTH_SLACK_SIGNUP}`, payload)
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

function companySignUp(payload) {
  return serviceHelpers
    // TODO: CHANGE WHEN AUTH_BASE_URL CHANGES - MEL
    .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_SIGNUP}`, payload)
    // .postRequest(`${AUTH_BASE_URL}${AUTH_SIGNUP}`, payload)
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

function sendPasswordResetLink(payload) {
  return serviceHelpers
    // TODO: CHANGE WHEN AUTH_BASE_URL CHANGES - MEL
    .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_FORGOT_PASSWORD}`, payload)
    // .postRequest(`${AUTH_BASE_URL}${AUTH_FORGOT_PASSWORD}`, payload)
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

function verifyCompany(payload) {
  return serviceHelpers
    // TODO: CHANGE WHEN AUTH_BASE_URL CHANGES - MEL
    .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_VERIFY_COMPANY}`, payload)
    // .postRequest(`${AUTH_BASE_URL}${AUTH_VERIFY_COMPANY}`, payload)
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

function confirmAccount(payload) {
  return serviceHelpers
    // TODO: CHANGE WHEN AUTH_BASE_URL CHANGES - MEL
    .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_VERIFY_ACCOUNT}`, payload)
    // .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_VERIFY_ACCOUNT}`, payload)
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

function resetPassword(payload) {
  return serviceHelpers
    // TODO: CHANGE WHEN AUTH_BASE_URL CHANGES - MEL
    .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_RESET_PASSWORD}`, payload)
    // .postRequest(`${AUTH_BASE_URL}${AUTH_RESET_PASSWORD}`, payload)
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

function resendEmailVerification(payload) {
  return serviceHelpers
    // TODO: CHANGE WHEN AUTH_BASE_URL CHANGES - MEL
    .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_RESEND_VERIFICATION}`, payload)
    // .postRequest(`${AUTH_BASE_URL}/${USER_MGT}${AUTH_RESEND_VERIFICATION}`, payload)
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

const recoverTeams = (payload) => (
  serviceHelpers.genericRequest("post", `${AUTH_BASE_URL}/${USER_MGT}${AUTH_RECOVER_TEAMS}`, payload)
);

export const authService = {
  login,
  loginWithGoogle,
  registerWithGoogle,
  loginWithSlack,
  registerWithSlack,
  companySignUp,
  sendPasswordResetLink,
  verifyCompany,
  confirmAccount,
  resetPassword,
  resendEmailVerification,
  recoverTeams,
};
