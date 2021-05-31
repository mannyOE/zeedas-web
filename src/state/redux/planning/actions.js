import { planningService } from "services/planning-service";
import { SET_ACTIVE_PLAN, SET_ACTIVE_SNIPPET, RESET_PLANNING } from "./types";

const fetchPlan = (moduleId) => (dispatch) => planningService
  .fetchPlan(moduleId)
  .then((response) => {
    dispatch({ type: SET_ACTIVE_PLAN, payload: response.data });
    debugger;
    return Promise.resolve(response);
  })
  .catch((err) => Promise.resolve(err));

const setActiveSnippet = (payload) => ({ type: SET_ACTIVE_SNIPPET, payload });
const reset = () => ({ type: RESET_PLANNING });

// eslint-disable-next-line import/prefer-default-export
export const planning = {
  fetchPlan,
  setActiveSnippet,
  reset,
};
