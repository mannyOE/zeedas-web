import { serviceHelpers } from "../utils/service-helpers";
import { APP_LIST } from "../utils/constants";

const { requestMethods, genericRequest } = serviceHelpers;

export const fetchApp = (project_id) => {
  const url = `${APP_LIST}/?projectId=${project_id}`;
  return genericRequest(requestMethods.GET, url);
};
