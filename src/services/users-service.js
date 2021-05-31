/* eslint-disable import/prefer-default-export */
import {
  AUTH_BASE_URL,
  USERS_SEND_INVITE,
  ERROR_RESPONSE,
  USERS_CONFIRM_INVITE,
  USERS_ACCEPT_INVITE,
  USERS_GET_INVITES,
  USERS_GET_ROLES,
  USERS_GET_TEAM_MEMBER_DETAILS,
  USERS_GET_ACCOUNT_DETAILS,
  USERS_ENABLE_TEAM_MEMBER,
  USERS_DISABLE_TEAM_MEMBER,
  USERS_DELETE_TEAM_MEMBER,
  USERS_UPDATE_USER,
  USERS_UPDATE_PASSWORD,
  USERS_SET_SOCIAL_PASSWORD,
  USERS_GET_TEAM_MEMBERS,
  USERS_UPDATE_AVATAR,
  USERS_SKIP_INVITES,
  USERS_FINISH_ACCOUNT_SETUP,
  USERS_UPDATE_COMPANY_INFO,
  USERS_UPDATE_COMPANY_AVATAR,
  USERS_SET_FIREBASE_TOKEN,
} from "../utils/constants";
import { serviceHelpers } from "../utils/service-helpers";

function inviteTeamMembers(payload) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}${USERS_SEND_INVITE}`, payload)
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
function confirmInvite(payload) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}${USERS_CONFIRM_INVITE}`, payload)
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
function acceptInvite(payload) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}${USERS_ACCEPT_INVITE}`, payload)
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
function fetchInvites(payload) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}${USERS_GET_INVITES}`, payload)
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
function fetchRoles() {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}${USERS_GET_ROLES}`)
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
function fetchTeamMembers() {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}${USERS_GET_TEAM_MEMBERS}`)
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
function fetchTeamMemberProfile(accountId) {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}${USERS_GET_TEAM_MEMBER_DETAILS}/${accountId}`)
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
function fetchAccountInfo() {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}${USERS_GET_ACCOUNT_DETAILS}`)
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
function enableMember(userId) {
  return serviceHelpers
    .patchRequest(`${AUTH_BASE_URL}${USERS_ENABLE_TEAM_MEMBER}/${userId}`)
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
function disableMember(userId) {
  return serviceHelpers
    .patchRequest(`${AUTH_BASE_URL}${USERS_DISABLE_TEAM_MEMBER}/${userId}`)
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
function deleteMember(userId) {
  return serviceHelpers
    .deleteRequest(`${AUTH_BASE_URL}${USERS_DELETE_TEAM_MEMBER}/${userId}`)
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
function updateTeamMember(payload, teamMemberId) {
  return serviceHelpers
    .putRequest(`${AUTH_BASE_URL}${USERS_UPDATE_USER}/${teamMemberId}`, payload)
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
function updatePassword(payload) {
  return serviceHelpers
    .putRequest(`${AUTH_BASE_URL}${USERS_UPDATE_PASSWORD}`, payload)
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
function updateAccountInfo(payload) {
  return serviceHelpers
    .putRequest(`${AUTH_BASE_URL}${USERS_UPDATE_USER}`, payload)
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

function setSocialAccountPassword(payload) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}${USERS_SET_SOCIAL_PASSWORD}`, payload)
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

function updateAvatar(payload) {
  return serviceHelpers
    .postFormDataRequest(`${AUTH_BASE_URL}${USERS_UPDATE_AVATAR}`, payload)
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
function skipInvites() {
  return serviceHelpers
    .patchRequest(`${AUTH_BASE_URL}${USERS_SKIP_INVITES}`)
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

function finishAccountSetup(payload) {
  return serviceHelpers
    .putRequest(`${AUTH_BASE_URL}${USERS_FINISH_ACCOUNT_SETUP}`, payload)
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

function updateCompanyInfo(payload) {
  return serviceHelpers
    .putRequest(`${AUTH_BASE_URL}${USERS_UPDATE_COMPANY_INFO}`, payload)
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

function updateCompanyAvatar(payload) {
  return serviceHelpers
    .putFormDataRequest(`${AUTH_BASE_URL}${USERS_UPDATE_COMPANY_AVATAR}`, payload)
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

const setFirebaseToken = (payload) => serviceHelpers
  .genericRequest("put", `${AUTH_BASE_URL}${USERS_SET_FIREBASE_TOKEN}`, payload);

export const usersService = {
  inviteTeamMembers,
  confirmInvite,
  acceptInvite,
  fetchInvites,
  fetchRoles,
  fetchTeamMembers,
  fetchTeamMemberProfile,
  fetchAccountInfo,
  enableMember,
  disableMember,
  deleteMember,
  updateTeamMember,
  updatePassword,
  updateAccountInfo,
  setSocialAccountPassword,
  updateAvatar,
  skipInvites,
  finishAccountSetup,
  updateCompanyAvatar,
  updateCompanyInfo,
  setFirebaseToken,
};
