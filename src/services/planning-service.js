import { AUTH_BASE_URL } from "utils/constants";
import { serviceHelpers } from "../utils/service-helpers";

const PLANNING_BASE_URL = `${AUTH_BASE_URL}/planning/planning`;

const api = {
  FETCH_PLAN: (moduleId) => `${PLANNING_BASE_URL}/${moduleId}`,

  FETCH_DEPENDENCIES: (moduleId) => `${PLANNING_BASE_URL}/fetch-class-list/${moduleId}`,

  SET_COMPLEXITY: `${PLANNING_BASE_URL}/set-task-complexity/`,
  APPROVE_PLAN: `${PLANNING_BASE_URL}/approve-plan/`,
};

const fetchPlan = (moduleId) => serviceHelpers.genericRequest("get", api.FETCH_PLAN(moduleId));
const fetchDependencies = (appId) => serviceHelpers.genericRequest("get", api.FETCH_DEPENDENCIES(appId));
const setComplexity = (payload) => serviceHelpers.genericRequest("patch", api.SET_COMPLEXITY, payload);
const approvePlan = (payload) => serviceHelpers.genericRequest("patch", api.APPROVE_PLAN, payload);

export const planningService = {
  fetchPlan,
  fetchDependencies,
  setComplexity,
  approvePlan,
};
