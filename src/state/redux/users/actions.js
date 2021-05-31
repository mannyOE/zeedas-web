/* eslint-disable import/prefer-default-export */
import { usersService } from "../../../services/users-service";
import {
  USER_ROLES,
  TEAMS_LIST,
  USER_ACCOUNT_INFO,
  TEAM_MEMBER_PROFILE, ACCOUNT_SETUP_COMPLETE, SETUP_INVITES_COMPLETE,
} from "./types";
import { notify } from "../../../zeedas-components/bottom-notification";
import { NOTIFICATION_FAILURE, NOTIFICATION_SUCCESS } from "../../../constants";
import { ERROR_RESPONSE } from "../../../utils/constants";
import { requestActions } from "../requests/actions";
import { history } from "../../history";

function getTeamByEmploymentMode(data, employmentMode) {
  // const teamMembers = data.members;

  // // TO DO (AMA): This should not be joined
  // const jointTeamMembers = [...teamMembers];

  // const team = jointTeamMembers.filter(
  //   (item, index) => item.employmentMode === employmentMode
  // );

  return data.filter(
    (item, index) => item.employmentMode === employmentMode,
  );
  // const invited = data.invites.filter(
  //   (item, index) => item.employmentMode === employmentMode
  // );

  // return { active, invited };

  // return team;
}

function fetchRoles() {
  function success(data) {
    return { type: USER_ROLES, data };
  }
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.fetchRoles().then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          dispatch(success(response.response.data));
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}

function completedAccountSetup(trueOrFalse) {
  return {
    type: ACCOUNT_SETUP_COMPLETE,
    data: trueOrFalse,
  };
}

function completedSetupInvites(trueOrFalse) {
  return {
    type: SETUP_INVITES_COMPLETE,
    data: trueOrFalse,
  };
}

function inviteTeamMembers(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.inviteTeamMembers(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
          dispatch(completedSetupInvites(true));
        }
        return response;
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function acceptInvite(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.acceptInvite(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
          history.push("/authentication/login");
        }
        return response;
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}

function fetchTeamMembers() {
  function success(data) {
    return { type: TEAMS_LIST, data };
  }

  return (dispatch) => {
    dispatch(requestActions.startFullPageRequest());
    return usersService.fetchTeamMembers().then(
      (response) => {
        dispatch(requestActions.stopFullPageRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          const teamsList = {
            coreTeam: getTeamByEmploymentMode(
              response.response.data.members,
              "fulltime",
            ),
            contractTeam: getTeamByEmploymentMode(
              response.response.data.members,
              "contract",
            ),
          };
          const invitedTeamsList = {
            coreTeam: getTeamByEmploymentMode(
              response.response.data.invites,
              "fulltime",
            ),
            contractTeam: getTeamByEmploymentMode(
              response.response.data.invites,
              "contract",
            ),
          };

          dispatch(success({ teamsList, invitedTeamsList }));
          // notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopFullPageRequest());
      },
    );
  };
}

function fetchAccountInfo() {
  function success(data) {
    return { type: USER_ACCOUNT_INFO, data };
  }

  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.fetchAccountInfo().then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          dispatch(success(response.response.data));
          // notify(response.response.message, NOTIFICATION_SUCCESS);
          return Promise.resolve(response.response.data);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
        return Promise.error(error);
      },
    );
  };
}
function fetchTeamMemberProfile(accountId) {
  function success(data) {
    return { type: TEAM_MEMBER_PROFILE, data };
  }

  return (dispatch) => {
    dispatch(requestActions.startFullPageRequest());
    return usersService.fetchTeamMemberProfile(accountId).then(
      (response) => {
        dispatch(requestActions.stopFullPageRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          dispatch(success(response.response.data));
          // notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopFullPageRequest());
      },
    );
  };
}
function disableMember(userId) {
  // function success(data) {
  //   return { type: USER_ACCOUNT_INFO, data };
  // }

  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.disableMember(userId).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function enableMember(userId) {
  // function success(data) {
  //   return { type: USER_ACCOUNT_INFO, data };
  // }

  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.enableMember(userId).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}

function deleteMember(userId) {
  // function success(data) {
  //   return { type: USER_ACCOUNT_INFO, data };
  // }

  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.deleteMember(userId).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function updatePassword(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.updatePassword(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function updateAvatar(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.updateAvatar(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
          dispatch(fetchAccountInfo());
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function updateTeamMember(payload, teamMemberId) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.updateTeamMember(payload, teamMemberId).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function updateAccountInfo(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.updateAccountInfo(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
          dispatch(fetchAccountInfo());
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}

// function setupPersonalAccount(payload) {
//   return (dispatch) => {
//     dispatch(requestActions.startRequest());
//     return usersService.updateAccountInfo(payload).then(
//       (response) => {
//         dispatch(requestActions.stopRequest());
//         if (response.status === ERROR_RESPONSE) {
//           notify(response.response.message, NOTIFICATION_FAILURE);
//         } else {
//           notify(response.response.message, NOTIFICATION_SUCCESS);
//           history.push("/account-setup/invite-team-members");
//           // dispatch(fetchAccountInfo());
//         }
//       },
//       (error) => {
//         dispatch(requestActions.stopRequest());
//
//       }
//     );
//   };
// }
function skipInvites() {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.skipInvites().then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
          history.push("/");
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}

function finishAccountSetup(payload) {
  return async (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.finishAccountSetup(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
          dispatch(fetchAccountInfo());
          dispatch(completedAccountSetup(true));
          history.push("/account-setup/invite-team-members");
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}

function updateCompanyAvatar(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.updateCompanyAvatar(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
          dispatch(fetchAccountInfo());
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function updateCompanyInfo(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return usersService.updateCompanyInfo(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
          dispatch(fetchAccountInfo());
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}

export const usersActions = {
  inviteTeamMembers,
  acceptInvite,
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
  updateAvatar,
  skipInvites,
  finishAccountSetup,
  updateCompanyAvatar,
  updateCompanyInfo,
  //
  completedAccountSetup,
  completedSetupInvites,
};
