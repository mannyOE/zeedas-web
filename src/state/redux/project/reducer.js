import {
  TEAM_MEMBERS,
  PROJECTS,
  SINGLE_PROJECT,
  PROJECT_TODO,
  MEMBER_PROFILE,
  SORT_NEWEST,
  SORT_OLDEST,
  FILTER_CREATED_DATE,
  FILTER_SKILLS,
  FILTER_TEAM_MEMBERS,
  FILTER_TIMELINE,
} from "./types";

import sortFilterReducer from "./_sort-filter/reducer";

const INIT_STATE = {
  projectTeamMembers: null,
  projects: [],
  single_project: {},
  project_todo: {},
  project_member_profile: {},
  view: {
    sort: "newest",
    filter: "date_created",
  },
};

const projects = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TEAM_MEMBERS:
      return {
        ...state,
        projectTeamMembers: action.data,
      };
    case PROJECTS:
      return {
        ...state,
        projects: action.data,
      };
    case SINGLE_PROJECT:
      return {
        ...state,
        single_project: action.data,
      };
    case PROJECT_TODO:
      return {
        ...state,
        project_todo: action.data,
      };
    case MEMBER_PROFILE:
      return {
        ...state,
        project_member_profile: action.data,
      };

    // MEL
    case SORT_NEWEST:
    case SORT_OLDEST:
      return {
        ...state,
        view: {
          filter: state.view.filter,
          sort: action.payload.sort,
        },
      };
    case FILTER_SKILLS:
    case FILTER_TEAM_MEMBERS:
    case FILTER_TIMELINE:
    case FILTER_CREATED_DATE:
      return {
        ...state,
        view: {
          sort: state.view.sort,
          filter: action.payload.filter,
        },
      };
    default:
      return state;
  }
};

export default projects;
