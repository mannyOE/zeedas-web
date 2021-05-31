/* eslint-disable import/prefer-default-export */
import { authService } from "../../../services/auth-service";
import {
  ERROR_RESPONSE,
  LOCAL_STORE_COMPANY,
  SUCCESS_RESPONSE,
  EMAIL_NOT_CONFIRMED_RESPONSE,
} from "../../../utils/constants";
import { AUTH_FAILURE, AUTH_SUCCESS, AUTH_CLEAR } from "./types";
import { history } from "../../history";
import { notify } from "../../../zeedas-components/bottom-notification";
import { NOTIFICATION_FAILURE, NOTIFICATION_SUCCESS } from "../../../constants";
import { requestActions } from "../requests/actions";
import { usersService } from "../../../services/users-service";
import { USER_ACCOUNT_INFO, USER_ROLES } from "../users/types";
import { AppUtils } from "../../../utils/app-utils";
import { usersActions } from "../users/actions";

function loginWithGoogle(payload) {
  function authSuccess(data) {
    return { type: AUTH_SUCCESS, data };
  }
  function authFailure(data) {
    return { type: AUTH_FAILURE, data };
  }

  function accountInfoSuccess(data) {
    return { type: USER_ACCOUNT_INFO, data };
  }

  function teamRolesSuccess(data) {
    return { type: USER_ROLES, data };
  }

  return async (dispatch) => {
    dispatch(requestActions.startRequest());
    const loginResponse = await authService.loginWithGoogle(payload);
    if (loginResponse.status === SUCCESS_RESPONSE) {
      dispatch(authSuccess(loginResponse.response.data));
      const accountInfoResponse = await usersService.fetchAccountInfo();
      const teamRolesResponse = await usersService.fetchRoles();
      await dispatch(usersActions.fetchTeamMembers());

      // team roles
      if (teamRolesResponse.status === ERROR_RESPONSE) {
        notify(teamRolesResponse.response.message, NOTIFICATION_FAILURE);
      } else {
        dispatch(teamRolesSuccess(teamRolesResponse.response.data));
      }

      if (accountInfoResponse.status === SUCCESS_RESPONSE) {
        dispatch(accountInfoSuccess(accountInfoResponse.response.data));
        if (
          accountInfoResponse.response.data.user.accountType === "company"
          && !accountInfoResponse.response.data.user.skip
        ) {
          history.push("/account-setup/setup-personal-account");
        } else {
          const { from } = history.location.state || {
            from: {
              pathname: `${AppUtils.getDefaultHomeRoute(
                accountInfoResponse.response.data.membershipInfo.roles[0],
              )}`,
            },
          };
          history.push(from);
        }
        window.localStorage.removeItem(LOCAL_STORE_COMPANY);
      } else {
        notify(accountInfoResponse.response.message, NOTIFICATION_FAILURE);
      }
    } else {
      dispatch(authFailure(loginResponse.response.message));
      notify(loginResponse.response.message, NOTIFICATION_FAILURE);
    }
    dispatch(requestActions.stopRequest());
  };
}

function signupWithGoogle(payload) {
  function authSuccess(data) {
    return { type: AUTH_SUCCESS, data };
  }
  function authFailure(data) {
    return { type: AUTH_FAILURE, data };
  }

  function accountInfoSuccess(data) {
    return { type: USER_ACCOUNT_INFO, data };
  }

  function teamRolesSuccess(data) {
    return { type: USER_ROLES, data };
  }

  return async (dispatch) => {
    dispatch(requestActions.startRequest());
    const loginResponse = await authService.registerWithGoogle(payload);
    if (loginResponse.status === SUCCESS_RESPONSE) {
      dispatch(authSuccess(loginResponse.response.data));
      const accountInfoResponse = await usersService.fetchAccountInfo();
      const teamRolesResponse = await usersService.fetchRoles();
      await dispatch(usersActions.fetchTeamMembers());

      // team roles
      if (teamRolesResponse.status === ERROR_RESPONSE) {
        notify(teamRolesResponse.response.message, NOTIFICATION_FAILURE);
      } else {
        dispatch(teamRolesSuccess(teamRolesResponse.response.data));
      }

      if (accountInfoResponse.status === SUCCESS_RESPONSE) {
        dispatch(accountInfoSuccess(accountInfoResponse.response.data));
        if (
          accountInfoResponse.response.data.user.accountType === "company"
          && !accountInfoResponse.response.data.user.skip
        ) {
          history.push("/account-setup/setup-personal-account");
        } else {
          const { from } = history.location.state || {
            from: {
              pathname: `${AppUtils.getDefaultHomeRoute(
                accountInfoResponse.response.data.membershipInfo.roles[0],
              )}`,
            },
          };
          history.push(from);
        }
        window.localStorage.removeItem(LOCAL_STORE_COMPANY);
      } else {
        notify(accountInfoResponse.response.message, NOTIFICATION_FAILURE);
      }
    } else {
      dispatch(authFailure(loginResponse.response.message));
      notify(loginResponse.response.message, NOTIFICATION_FAILURE);
    }
    dispatch(requestActions.stopRequest());
  };
}

function loginWithSlack(payload) {
  function authSuccess(data) {
    return { type: AUTH_SUCCESS, data };
  }
  function authFailure(data) {
    return { type: AUTH_FAILURE, data };
  }

  function accountInfoSuccess(data) {
    return { type: USER_ACCOUNT_INFO, data };
  }

  function teamRolesSuccess(data) {
    return { type: USER_ROLES, data };
  }

  return async (dispatch) => {
    dispatch(requestActions.startRequest());
    const loginResponse = await authService.loginWithSlack(payload);
    if (loginResponse.status === SUCCESS_RESPONSE) {
      dispatch(authSuccess(loginResponse.response.data));
      const accountInfoResponse = await usersService.fetchAccountInfo();
      const teamRolesResponse = await usersService.fetchRoles();
      await dispatch(usersActions.fetchTeamMembers());

      // team roles
      if (teamRolesResponse.status === ERROR_RESPONSE) {
        notify(teamRolesResponse.response.message, NOTIFICATION_FAILURE);
      } else {
        dispatch(teamRolesSuccess(teamRolesResponse.response.data));
      }

      if (accountInfoResponse.status === SUCCESS_RESPONSE) {
        dispatch(accountInfoSuccess(accountInfoResponse.response.data));
        if (
          accountInfoResponse.response.data.user.accountType === "company"
          && !accountInfoResponse.response.data.user.skip
        ) {
          history.push("/account-setup/setup-personal-account");
        } else {
          const { from } = history.location.state || {
            from: {
              pathname: `${AppUtils.getDefaultHomeRoute(
                accountInfoResponse.response.data.membershipInfo.roles[0],
              )}`,
            },
          };
          history.push(from);
        }
        window.localStorage.removeItem(LOCAL_STORE_COMPANY);
      } else {
        notify(accountInfoResponse.response.message, NOTIFICATION_FAILURE);
      }
    } else {
      dispatch(authFailure(loginResponse.response.message));
      notify(loginResponse.response.message, NOTIFICATION_FAILURE);
    }
    dispatch(requestActions.stopRequest());
  };
}

function signupWithSlack(payload) {
  function authSuccess(data) {
    return { type: AUTH_SUCCESS, data };
  }
  function authFailure(data) {
    return { type: AUTH_FAILURE, data };
  }

  function accountInfoSuccess(data) {
    return { type: USER_ACCOUNT_INFO, data };
  }

  function teamRolesSuccess(data) {
    return { type: USER_ROLES, data };
  }

  return async (dispatch) => {
    dispatch(requestActions.startRequest());
    const loginResponse = await authService.registerWithSlack(payload);
    if (loginResponse.status === SUCCESS_RESPONSE) {
      dispatch(authSuccess(loginResponse.response.data));
      const accountInfoResponse = await usersService.fetchAccountInfo();
      const teamRolesResponse = await usersService.fetchRoles();
      await dispatch(usersActions.fetchTeamMembers());

      // team roles
      if (teamRolesResponse.status === ERROR_RESPONSE) {
        notify(teamRolesResponse.response.message, NOTIFICATION_FAILURE);
      } else {
        dispatch(teamRolesSuccess(teamRolesResponse.response.data));
      }

      if (accountInfoResponse.status === SUCCESS_RESPONSE) {
        dispatch(accountInfoSuccess(accountInfoResponse.response.data));
        if (
          accountInfoResponse.response.data.user.accountType === "company"
          && !accountInfoResponse.response.data.user.skip
        ) {
          history.push("/account-setup/setup-personal-account");
        } else {
          const { from } = history.location.state || {
            from: {
              pathname: `${AppUtils.getDefaultHomeRoute(
                accountInfoResponse.response.data.membershipInfo.roles[0],
              )}`,
            },
          };
          history.push(from);
        }
        window.localStorage.removeItem(LOCAL_STORE_COMPANY);
      } else {
        notify(accountInfoResponse.response.message, NOTIFICATION_FAILURE);
      }
    } else {
      dispatch(authFailure(loginResponse.response.message));
      notify(loginResponse.response.message, NOTIFICATION_FAILURE);
    }
    dispatch(requestActions.stopRequest());
  };
}

function login(payload) {
  function authSuccess(data) {
    return { type: AUTH_SUCCESS, data };
  }
  function authFailure(data) {
    return { type: AUTH_FAILURE, data };
  }

  function accountInfoSuccess(data) {
    return { type: USER_ACCOUNT_INFO, data };
  }

  function teamRolesSuccess(data) {
    return { type: USER_ROLES, data };
  }

  return async (dispatch) => {
    dispatch(requestActions.startRequest());
    const loginResponse = await authService.login(payload);
    if (loginResponse.status === SUCCESS_RESPONSE) {
      dispatch(authSuccess(loginResponse.response.data));

      const accountInfoResponse = await usersService.fetchAccountInfo();
      const teamRolesResponse = await usersService.fetchRoles();
      await dispatch(usersActions.fetchTeamMembers());

      // team roles
      if (teamRolesResponse.status === ERROR_RESPONSE) {
        notify(teamRolesResponse.response.message, NOTIFICATION_FAILURE);
      } else {
        dispatch(teamRolesSuccess(teamRolesResponse.response.data));
      }

      if (accountInfoResponse.status === SUCCESS_RESPONSE) {
        dispatch(accountInfoSuccess(accountInfoResponse.response.data));
        if (
          accountInfoResponse.response.data.user.accountType === "company"
          && !accountInfoResponse.response.data.user.skip
        ) {
          history.push("/account-setup/setup-personal-account");
        } else {
          const { from } = history.location.state || {
            from: {
              pathname: `${AppUtils.getDefaultHomeRoute(
                accountInfoResponse.response.data.membershipInfo.roles[0],
              )}`,
            },
          };
          history.push(from);
        }
        window.localStorage.removeItem(LOCAL_STORE_COMPANY);
      } else {
        notify(accountInfoResponse.response.message, NOTIFICATION_FAILURE);
      }
    } else {
      dispatch(authFailure(loginResponse.response.message));
      notify(loginResponse.response.message, NOTIFICATION_FAILURE);
      if (loginResponse.response.message === EMAIL_NOT_CONFIRMED_RESPONSE) {
        history.push({
          pathname: "/authentication/email-verification",
          email: payload.email,
        });
      }
    }
    dispatch(requestActions.stopRequest());
  };
}

function logout() {
  function clearAuth() {
    return { type: AUTH_CLEAR };
  }
  return (dispatch) => {
    dispatch(clearAuth());
    history.push("/authentication/login");
  };
}

function companySignUp(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return authService.companySignUp(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
          history.push({
            pathname: "/authentication/email-verification",
            email: payload.email,
          });
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}

function sendPasswordResetLink(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return authService.sendPasswordResetLink(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
          history.push({
            pathname: "/authentication/email-verification",
            email: payload.email,
          });
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}

function verifyCompany(payload, { autoRoute } = { autoRoute: true }) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return authService.verifyCompany(payload)
      .then(
        (response) => {
          dispatch(requestActions.stopRequest());
          if (response.status === ERROR_RESPONSE) {
            notify(response.response.message, NOTIFICATION_FAILURE);
            return Promise.reject();
          }

          notify(response.response.message, NOTIFICATION_SUCCESS);
          const companyData = response.response.data;
          window.localStorage.setItem(
            LOCAL_STORE_COMPANY,
            JSON.stringify(companyData),
          );

          if (autoRoute) {
            history.push(`/${companyData.account}/authentication/login`);
          }

          return Promise.resolve(companyData);
        },
        (error) => {
          dispatch(requestActions.stopRequest());
          return Promise.reject(error);
        },
      );
  };
}

function confirmAccount(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return authService.confirmAccount(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
          history.push("/authentication/login");
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
          const companyData = response.response.data;
          window.localStorage.setItem(
            LOCAL_STORE_COMPANY,
            JSON.stringify(companyData),
          );
          history.push(`/${companyData.account}/authentication/login`);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}

function resetPassword(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return authService.resetPassword(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
          history.push("/authentication/login");
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}

function resendEmailVerification(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return authService.resendEmailVerification(payload).then(
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

const recoverTeams = (payload) => (
  authService.recoverTeams(payload)
    .then((response) => {
      if (response.code !== 200) {
        return Promise.reject(response);
      }
      return response.message;
    })
    .catch((err) => {
      if (err.message || err.response.message) {
        return Promise.reject(err.message || err.response.message);
      }
      return Promise.reject("An error occurred");
    })
);

// const recoverTeams = (payload) => (dispatch) => (
//   authService.recoverTeams("payload")
//     .then((response) => {
//       if (response.code !== 200) {
//         return Promise.reject(response.message);
//       }
//       return response.message;
//     })
//     .catch((err) => {
//       if (err.message || err.response.message) {
//         return err.message || err.response.message;
//       }
//       return "An error occurred";
//     })
// );

export const authActions = {
  login,
  loginWithGoogle,
  signupWithGoogle,
  loginWithSlack,
  signupWithSlack,
  logout,
  companySignUp,
  sendPasswordResetLink,
  verifyCompany,
  confirmAccount,
  resetPassword,
  resendEmailVerification,
  recoverTeams,
};
