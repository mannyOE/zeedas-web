// MOVED TO PARENT REDUCER

import {
  SORT_NEWEST,
  SORT_OLDEST,
  FILTER_CREATED_DATE,
  FILTER_SKILLS,
  FILTER_TEAM_MEMBERS,
  FILTER_TIMELINE,
} from "./types";

/**
 * @typedef {{sort: string, filter: string}} SortFilterState
 * @typedef {{ type: string, payload: { sort: string }}} SortActionType
 * @typedef {{ type: string, payload: { filter: string }}} FilterActionType
 * */

const INIT_STATE = {
  sort: "newest",
  filter: "date_created",
};

/**
 * @param {SortFilterState} state - the current state
 * @param {SortActionType | FilterActionType} action - the action to be taken
 * */
const sortFilterReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SORT_NEWEST:
    case SORT_OLDEST:
      return {
        ...state,
        sort: action.payload.sort,
      };
    case FILTER_SKILLS:
    case FILTER_TEAM_MEMBERS:
    case FILTER_TIMELINE:
    case FILTER_CREATED_DATE:
      return {
        ...state,
        filter: action.payload.filter,
      };
    default:
      return state;
  }
};

export default sortFilterReducer;
