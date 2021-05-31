/* eslint-disable import/prefer-default-export */
import { store } from "../state/redux/store";
import {
  APP_ROLES,
  PAGES_WITH_ROLES,
  PAGE_PATH,
  BASE_REFERRAL_LINK_URL,
} from "./constants";

function interpretRole(roleValue) {
  const { users } = store.getState();

  if (users.userRoles.length > 0) {
    const friendlyRoleName = users.userRoles.find(
      (item) => item.value === roleValue,
    ).label;
    return friendlyRoleName;
  }

  return null;
}

// get first letters of a string
const getInitials = (string) => string
  .split(" ")
  .map(([firstLetter]) => firstLetter)
  .filter((_, index, array) => index === 0 || index === array.length - 1)
  .join("")
  .toUpperCase();

const getDefaultHomeRoute = (role) => {
  switch (role) {
    case APP_ROLES.OWNER:
    case APP_ROLES.ADMIN:
      return `/${PAGE_PATH.PATH_OVERVIEW}`;

    case APP_ROLES.QUALITY_ASSURANCE:
    case APP_ROLES.ENTERPRISE_ARCHITECT:
    case APP_ROLES.SOFTWARE_DEVELOPER:
    default:
      return `/${PAGE_PATH.PATH_PROJECTS}`;
  }
};

const getAuthorisedPageRoles = (pageUrl) => {
  switch (pageUrl) {
    case PAGE_PATH.PATH_OVERVIEW:
      return PAGES_WITH_ROLES.ROLES_OVERVIEW;
    case PAGE_PATH.PATH_WALLET:
      return PAGES_WITH_ROLES.ROLES_WALLET;
    case PAGE_PATH.PATH_TEAM_PROFILE:
      return PAGES_WITH_ROLES.ROLES_TEAM_PROFILE;
    case PAGE_PATH.PATH_SETUP_PERSONAL_ACCOUNT:
      return PAGES_WITH_ROLES.ROLES_SETUP_PERSONAL_ACCOUNT;
    default:
      return null;
  }
};

const getCurrentUserRole = () => {
  const { users } = store.getState();
  if (users.accountInfo) {
    return users.accountInfo.membershipInfo.roles[0];
  }
  return null;
};

const getCurrentUserRolesList = () => {
  const { users } = store.getState();
  if (users.accountInfo) {
    return users.accountInfo.membershipInfo.roles;
  }
  return [];
};

const confirmCurrentUserCompanyRole = (role) => {
  const { users } = store.getState();
  if (users.accountInfo) {
    const userRoles = users.accountInfo.membershipInfo.roles;
    const match = userRoles.find((userRole) => userRole === role);
    if (match) return true;
    return false;
  }
  return false;
};

const confirmCurrentUserProjectRole = (role) => {
  const { users } = store.getState();
  const { projects } = store.getState();

  if (users.accountInfo) {
    const projectTeam = users.accountInfo.membershipInfo.projects.find(
      (project) => project.id === projects.single_project._id,
    );
    if (!projectTeam) return;
    const userTeamRoles = projectTeam.roles;
    const match = userTeamRoles.find((userRole) => userRole === role);
    if (match) return true;
    return false;
  }
  return false;
};

const getCurrentUserId = () => {
  const { users } = store.getState();
  if (users.accountInfo) {
    return users.accountInfo.user._id;
  }
  return null;
};

const getProjectTeamByRole = (userRole) => {
  /**
   * Fetches the team members of a project by their role
   *
   * @param {string} userRole the role of the user
   * @return {array} the list of matching developers
   */

  const { projects } = store.getState();
  const activeProject = projects.single_project;
  return activeProject.users.filter((member) => member.roles.includes(userRole));
};

const getReferralLink = (referralCode) => `${BASE_REFERRAL_LINK_URL}${referralCode}`;

export const AppUtils = {
  interpretRole,
  getInitials,
  getDefaultHomeRoute,
  getAuthorisedPageRoles,
  getCurrentUserRole,
  getCurrentUserRolesList,
  confirmCurrentUserCompanyRole,
  confirmCurrentUserProjectRole,
  getCurrentUserId,
  getProjectTeamByRole,
  getReferralLink,
};
