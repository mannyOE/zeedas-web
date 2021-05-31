import {
  USER_ROLES,
  TEAMS_LIST,
  USER_ACCOUNT_INFO,
  TEAM_MEMBER_PROFILE, ACCOUNT_SETUP_COMPLETE, SETUP_INVITES_COMPLETE,
} from "./types";
import { AUTH_CLEAR } from "../auth/types";
import { APP_ROLES } from "../../../utils/constants";

const INIT_STATE = {
  userRoles: [],
  teamsList: null,
  invitedTeamsList: null,
  accountInfo: null,
  teamMemberProfile: null,
  completedAccountSetup: false,
  completedSetupInvites: false,
};

const users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_ROLES:
      return {
        ...state,
        userRoles: action.data,
      };

    case TEAMS_LIST:
      return {
        ...state,
        teamsList: action.data.teamsList,
        invitedTeamsList: action.data.invitedTeamsList,
      };

    case USER_ACCOUNT_INFO:
      return {
        ...state,
        accountInfo: action.data,
      };

    case TEAM_MEMBER_PROFILE:
      return {
        ...state,
        teamMemberProfile: action.data,
      };

    case ACCOUNT_SETUP_COMPLETE:
      return {
        ...state,
        completedAccountSetup: action.data,
      };

    case SETUP_INVITES_COMPLETE:
      return {
        ...state,
        completedSetupInvites: action.data,
      };

    case AUTH_CLEAR:
      return INIT_STATE;

    default:
      return state;
  }
};

export default users;
