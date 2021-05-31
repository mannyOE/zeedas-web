import {
  PROJECT,
  AUTH_BASE_URL,
  PROJECT_SERVICE,
  ERROR_RESPONSE,
} from "../utils/constants";
import { serviceHelpers } from "../utils/service-helpers";

function getTeamMembers() {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}/user-management/user/list-team`)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function getProjects() {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}${PROJECT_SERVICE}`)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function createProject(payload) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}${PROJECT_SERVICE}`, payload)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function updateProject(payload, id) {
  return serviceHelpers
    .putRequest(`${AUTH_BASE_URL}${PROJECT_SERVICE}/${id}`, payload)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function fetchSingleProject(id) {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}${PROJECT_SERVICE}/${id}`)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function deleteMember(projectId, userId) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}${PROJECT_SERVICE}/members/remove`, {
      projectId,
      userId,
    })
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function changeTeamRole(payload) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}${PROJECT_SERVICE}/members/role`, payload)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function deleteProject(id, payload) {
  if (payload) {
    return serviceHelpers
      .genericRequest("delete", `${AUTH_BASE_URL}${PROJECT_SERVICE}/${id}`, payload);
  }

  return serviceHelpers
    .deleteRequest(`${AUTH_BASE_URL}${PROJECT_SERVICE}/${id}`)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function copyProjectLink(id) {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}${PROJECT_SERVICE}/copy/${id}`)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function shareProjectLink(items, id) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}${PROJECT_SERVICE}/share`, {
      id,
      emails: items,
    })
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function inviteTeamMembers(payload) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}${PROJECT_SERVICE}/members`, payload)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}

function createTodo(payload) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}/project-service/todos`, payload)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function assignProjectLead(projectId, userId) {
  return serviceHelpers
    .postRequest(`${AUTH_BASE_URL}${PROJECT_SERVICE}/members/role/team-lead`, {
      projectId,
      userId,
    })
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function fetchTodo(id) {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}/project-service/todos/${id}`)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function markTodo(projectId, todoId) {
  return serviceHelpers
    .postRequest(
      `${AUTH_BASE_URL}/project-service/todos/complete/${projectId}/${todoId}`,
    )
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
function searchProject(searchQuery) {
  return serviceHelpers
    .getRequest(`${AUTH_BASE_URL}/project-service/search?search=${searchQuery}`)
    .then((res) => {
      const { error } = res.response;
      if (!error) {
        return res;
      }
      return serviceHelpers.formatPromiseResponse(error, ERROR_RESPONSE);
    })
    .catch((error) => {
      const errorMessage = serviceHelpers.interpretErrorResponse(error);
      return serviceHelpers.formatPromiseResponse(errorMessage, ERROR_RESPONSE);
    });
}
// eslint-disable-next-line import/prefer-default-export
export const projectService = {
  getTeamMembers,
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  copyProjectLink,
  shareProjectLink,
  fetchSingleProject,
  deleteMember,
  inviteTeamMembers,
  changeTeamRole,
  assignProjectLead,
  createTodo,
  fetchTodo,
  markTodo,
  searchProject,
};
