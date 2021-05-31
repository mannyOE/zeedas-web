import { SET_ACTIVE_PLAN, SET_ACTIVE_SNIPPET, RESET_PLANNING } from "./types";

const INIT_STATE = {
  activePlan: {},
  activeSnippet: {},
};

const planning = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_PLAN:
      return {
        ...state,
        activePlan: action.payload,
      };

    case SET_ACTIVE_SNIPPET:
      return {
        ...state,
        activeSnippet: action.payload,
      };

    case RESET_PLANNING:
      return INIT_STATE;
    default:
      return state;
  }
};

export default planning;
