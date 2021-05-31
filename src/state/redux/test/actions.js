import {
  FETCH_TEST_CASES,
  FETCH_TEST_CASES_DONE,
  FETCH_TEST_CASES_ERROR,
  CREATE_TEST_CASE,
  CREATE_TEST_CASE_DONE,
  CREATE_TEST_CASE_ERROR,
  UPDATE_TEST_CASE,
  UPDATE_TEST_CASE_DONE,
  UPDATE_TEST_CASE_ERROR,
  PUBLISH_TEST_CASES,
  PUBLISH_TEST_CASES_DONE,
  PUBLISH_TEST_CASES_ERROR,
  DELETE_TEST_CASE,
  DELETE_TEST_CASE_DONE,
  DELETE_TEST_CASE_ERROR,
  FETCH_STATS,
  FETCH_STATS_DONE,
  FETCH_STATS_ERROR,
  CLEAR_TESTCASES,
} from "./types";
import * as testService from "../../../services/test-service";
import * as moduleService from "../../../services/kanban-service";
import { store } from "../store";

export const testCaseSelector = (state) => state.test.testCases;
export const testStatsSelector = (state) => state.test.stats;

export const fetchTestCasesActions = {
  request: () => ({
    type: FETCH_TEST_CASES,
  }),
  receive: (payload) => ({
    type: FETCH_TEST_CASES_DONE,
    payload,
  }),
  failed: (payload) => ({
    type: FETCH_TEST_CASES_ERROR,
    payload,
  }),
};

export const createTestCasesActions = {
  request: () => ({
    type: CREATE_TEST_CASE,
  }),
  receive: (payload) => ({
    type: CREATE_TEST_CASE_DONE,
    payload,
  }),
  failed: (payload) => ({
    type: CREATE_TEST_CASE_ERROR,
    payload,
  }),
};

export const updateTestCaseActions = {
  request: () => ({
    type: UPDATE_TEST_CASE,
  }),
  receive: (payload) => ({
    type: UPDATE_TEST_CASE_DONE,
    payload,
  }),
  failed: (payload) => ({
    type: UPDATE_TEST_CASE_ERROR,
    payload,
  }),
};

export const publishTestCasesActions = {
  request: () => ({
    type: PUBLISH_TEST_CASES,
  }),
  receive: (payload) => ({
    type: PUBLISH_TEST_CASES_DONE,
    payload,
  }),
  failed: (payload) => ({
    type: PUBLISH_TEST_CASES_ERROR,
    payload,
  }),
};

export const deleteTestCasesActions = {
  request: () => ({
    type: DELETE_TEST_CASE,
  }),
  receive: (payload) => ({
    type: DELETE_TEST_CASE_DONE,
    payload,
  }),
  failed: (payload) => ({
    type: DELETE_TEST_CASE_ERROR,
    payload,
  }),
};

export const fetchStatsActions = {
  request: () => ({
    type: FETCH_STATS,
  }),
  receive: (payload) => ({
    type: FETCH_STATS_DONE,
    payload,
  }),
  failed: (payload) => ({
    type: FETCH_STATS_ERROR,
    payload,
  }),
};

export const fetchTestCases = (app_id, module_id) => {
  const { receive, request, failed } = fetchTestCasesActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      const { data } = await testService.fetchTestCases(module_id);
      dispatch(receive(data));
    } catch (e) {
      dispatch(failed(e));
    }
  };
};

export const createTestCase = (payload, projectId) => {
  const { receive, request, failed } = createTestCasesActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      const { data } = await testService.createTestCase(payload);
      dispatch(receive(data));
      if (projectId) {
        fetchStats(projectId)(dispatch);
      }
    } catch (e) {
      dispatch(failed(e));
    }
  };
};

export const updateAllTestCases = () => {
  const { receive, request, failed } = updateTestCaseActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      const testCases = testCaseSelector(store.getState());
      const updateRequest = testCases.map(({ _id }) => testService.updateTestCase(_id, { status: "passed" }));
      const response = await Promise.all(updateRequest);
      const newTestCases = response.map(({ data }) => data);
      dispatch(receive(newTestCases));
    } catch (e) {
      dispatch(failed(e));
    }
  };
};

export const updateTestCase = (testId, payload, projectId) => {
  const { receive, request, failed } = updateTestCaseActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      const { data } = await testService.updateTestCase(testId, payload);
      const testCases = testCaseSelector(store.getState());
      const newTestCase = testCases.filter(({ _id }) => _id !== testId);
      dispatch(receive([...newTestCase, data]));
      if (projectId) {
        fetchStats(projectId)(dispatch);
      }
    } catch (e) {
      dispatch(failed(e));
    }
  };
};

export const publishTestCases = (moduleId, projectId) => {
  const { receive, request, failed } = publishTestCasesActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      const { data } = await testService.publishTestCases(moduleId);
      dispatch(receive(data));
      if (projectId) {
        fetchStats(projectId)(dispatch);
      }
    } catch (e) {
      dispatch(failed(e));
    }
  };
};

export const deleteTestCase = (testId, projectId) => {
  const { receive, request, failed } = deleteTestCasesActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      await testService.deleteTestCase(testId);
      const testCases = testCaseSelector(store.getState());
      const newTestCases = testCases.filter(({ _id }) => _id !== testId);
      dispatch(receive([...newTestCases]));
      if (projectId) {
        fetchStats(projectId)(dispatch);
      }
    } catch (error) {
      dispatch(failed(error));
    }
  };
};

export const fetchStats = (project_id) => {
  const { receive, request, failed } = fetchStatsActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      const { data } = await testService.fetchStats(project_id);
      const response = await moduleService.fetchStats(project_id);
      dispatch(receive({ ...data, ...response.data }));
    } catch (e) {
      dispatch(failed(e));
    }
  };
};

export const clearTestCases = () => (dispactch) => dispactch({
  type: CLEAR_TESTCASES,
});
