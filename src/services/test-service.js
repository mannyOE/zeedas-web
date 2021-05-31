/* eslint-disable camelcase */
import { serviceHelpers } from "../utils/service-helpers";
import {
  TEST_CASES_LIST,
  TEST_CASE_CREATE,
  TEST_CASE_UPDATE,
  TEST_CASE_DELETE,
  TEST_CASES_PUBLISH,
  TEST_CASES_STATS,
} from "../utils/constants";

export const fetchTestCases = (module_id) => {
  const url = `${TEST_CASES_LIST}?module=${module_id}`;
  return serviceHelpers.genericRequest("get", url);
};

export const createTestCase = (payload) => serviceHelpers.genericRequest("post", TEST_CASE_CREATE, payload);

export const deleteTestCase = (test_case_id) => serviceHelpers.genericRequest("delete", `${TEST_CASE_DELETE}/${test_case_id}`);

export const updateTestCase = (test_case_id, payload) => serviceHelpers.genericRequest("put", `${TEST_CASE_UPDATE}/${test_case_id}`, payload);

export const publishTestCases = (module_id) => {
  const url = `${TEST_CASES_PUBLISH}/${module_id}`;
  return serviceHelpers.genericRequest("put", url);
};

export const fetchStats = (project_id) => {
  const url = `${TEST_CASES_STATS}/${project_id}`;
  return serviceHelpers.genericRequest("get", url);
};
