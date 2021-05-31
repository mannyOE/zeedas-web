/* eslint-disable camelcase */
import { serviceHelpers } from "../utils/service-helpers";
import {
  MODULE_CREATE,
  MODULE_DELETE,
  MODULE_LIST,
  MODULE_UPDATE,
  MODULE_STATS,
  MODULE_PUBLISH,
} from "../utils/constants";

export const fetchModules = (project_id, page = 1) => {
  const url = `${MODULE_LIST}?project=${project_id}&page=${1}&limit=100`;
  return serviceHelpers.genericRequest("get", url);
};

export const createModule = (payload) => serviceHelpers.genericRequest("post", MODULE_CREATE, payload);

export const deleteModule = (module_id) => serviceHelpers.genericRequest("delete", `${MODULE_DELETE}/${module_id}`);

export const updateModule = (module_id, payload) => serviceHelpers.genericRequest("put", `${MODULE_UPDATE}/${module_id}`, payload);

export const fetchStats = (project_id) => {
  const url = `${MODULE_STATS}/${project_id}`;
  return serviceHelpers.genericRequest("get", url);
};

export const publishModule = (module_id) => {
  const url = `${MODULE_PUBLISH}/${module_id}`;
  return serviceHelpers.genericRequest("put", url);
};
