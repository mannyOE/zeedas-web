import { AUTH_SUCCESS, AUTH_FAILURE, AUTH_CLEAR } from "./types";

const INIT_STATE = {
  userData: null,
  accessToken: null,
};

const auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        userData: action.data.user,
        accessToken: action.data.accessToken,
      };
    case AUTH_FAILURE:
      return state;
    case AUTH_CLEAR:
      return INIT_STATE;
    default:
      return state;
  }
};

export default auth;
