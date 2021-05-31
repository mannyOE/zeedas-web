// MOVED TO PARENT ACTIONS

import {
  SORT_NEWEST,
  SORT_OLDEST,
  FILTER_CREATED_DATE,
  FILTER_SKILLS,
  FILTER_TEAM_MEMBERS,
  FILTER_TIMELINE,
} from "./types";

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
