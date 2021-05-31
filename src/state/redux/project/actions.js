/* eslint-disable import/prefer-default-export */
import { projectService } from "../../../services/projects-service";
import {
  TEAM_MEMBERS,
  MEMBER_PROFILE,
  PROJECTS,
  SINGLE_PROJECT,
  PROJECT_TODO,
  SORT_NEWEST,
  SORT_OLDEST,
  FILTER_CREATED_DATE,
  FILTER_SKILLS,
  FILTER_TEAM_MEMBERS,
  FILTER_TIMELINE,
} from "./types";
import { notify } from "../../../zeedas-components/bottom-notification";
import { NOTIFICATION_FAILURE, NOTIFICATION_SUCCESS } from "../../../constants";
import { ERROR_RESPONSE } from "../../../utils/constants";
import { requestActions } from "../requests/actions";
import { history } from "../../history";

function inviteTeamMembers(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return projectService.inviteTeamMembers(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function getTeamMembers() {
  function success(data) {
    return { type: TEAM_MEMBERS, data };
  }
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return projectService.getTeamMembers().then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          dispatch(success(response.response.data));
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function getProjects() {
  function success(data) {
    return { type: PROJECTS, data };
  }
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return projectService.getProjects().then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          dispatch(success(response.response.data));
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}

function setSingleProject(data) {
  return { type: SINGLE_PROJECT, data };
}

function fetchSingleProject(id) {
  function success(data) {
    return { type: SINGLE_PROJECT, data };
  }

  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return projectService.fetchSingleProject(id).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          const singleProject = response.response.data;
          const getUsers = singleProject.users.filter(
            (user) => user.projectMember !== undefined && user.projectMember === true,
          );
          singleProject.users = getUsers;
          dispatch(success(singleProject));
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
    // dispatch(requestActions.startRequest());
    // dispatch(success(projectData));
  };
}
function deleteMember(projectId, userId) {
  // function success(data) {
  //   return { type: USER_ACCOUNT_INFO, data };
  // }

  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return projectService.deleteMember(projectId, userId).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function assignProjectLead(projectId, userId) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return projectService.assignProjectLead(projectId, userId).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function changeTeamRole(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return projectService.changeTeamRole(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function createTodo(payload) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return projectService.createTodo(payload).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function fetchTodo(id) {
  function success(data) {
    return { type: PROJECT_TODO, data };
  }
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return projectService.fetchTodo(id).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          dispatch(success(response.response.data.data));
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function markTodo(projectId, todoId) {
  return (dispatch) => {
    dispatch(requestActions.startRequest());
    return projectService.markTodo(projectId, todoId).then(
      (response) => {
        dispatch(requestActions.stopRequest());
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          notify(response.response.message, NOTIFICATION_SUCCESS);
        }
      },
      (error) => {
        dispatch(requestActions.stopRequest());
      },
    );
  };
}
function fetchProjectMemberProfile(data) {
  function success(data) {
    return { type: MEMBER_PROFILE, data };
  }
  return (dispatch) => {
    dispatch(success(data));
  };
}

// MEL
/**
 * Project sort/filter types
 * @typedef {"newest" | "oldest"} SortActionTypes
 * @typedef {"timeline" | "date_created" | "team_members" | "skills"} FilterActionTypes
 * @typedef {"SORT_NEWEST" | "SORT_OLDEST"} SortTypes
 * @typedef {
 * "FILTER_CREATED_DATE" | "FILTER_SKILLS" | "FILTER_TEAM_MEMBERS" | "FILTER_TIMELINE"
 * } FilterTypes
 * */

/**
 * Assigns the sort type used for the sort action
 * @param {SortActionTypes} type
 * @return {SortTypes}
 * @example
 * sortTypeHandler("oldest")
 * */
const sortTypeHandler = (type) => {
  switch (type) {
    case "oldest":
      return SORT_OLDEST;
    case "newest":
    default:
      return SORT_NEWEST;
  }
};

/**
 * Assigns the filter type used for the filter action
 * @param {FilterActionTypes} type
 * @return {FilterTypes}
 * @example
 * filterTypeHandler("oldest")
 * */
const filterTypeHandler = (type) => {
  switch (type) {
    case "timeline":
      return FILTER_TIMELINE;
    case "team_members":
      return FILTER_TEAM_MEMBERS;
    case "skills":
      return FILTER_SKILLS;
    case "date_created":
    default:
      return FILTER_CREATED_DATE;
  }
};

/**
 * Sort items
 * @param {SortActionTypes} data - value to sort by
 * @return {{ type: string, payload: { sort: string } }}
 * @example
 * sortItems("oldest")
 * */
export function sortItems(data) {
  return {
    type: sortTypeHandler(data),
    payload: {
      sort: data,
    },
  };
}

/**
 * Filter items
 * @param {FilterActionTypes} data - value to filter by
 * @return {{ type: string, payload: { filter: string } }}
 * @example
 * filterItems("date_created")
 * */
export function filterItems(data) {
  return {
    type: filterTypeHandler(data),
    payload: {
      filter: data,
    },
  };
}

export const projectActions = {
  getTeamMembers,
  getProjects,
  fetchSingleProject,
  setSingleProject,
  deleteMember,
  inviteTeamMembers,
  changeTeamRole,
  assignProjectLead,
  createTodo,
  fetchTodo,
  markTodo,
  fetchProjectMemberProfile,
  sortItems,
  filterItems,
};
