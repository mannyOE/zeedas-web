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
  DELETE_TEST_CASE,
  DELETE_TEST_CASE_DONE,
  DELETE_TEST_CASE_ERROR,
  PUBLISH_TEST_CASES,
  PUBLISH_TEST_CASES_DONE,
  PUBLISH_TEST_CASES_ERROR,
  FETCH_STATS,
  FETCH_STATS_DONE,
  FETCH_STATS_ERROR,
  CLEAR_TESTCASES
} from './types';

const initialState = {
  testCases: [],
  isFetching: false,
  isUpdating: true,
  isCreating: false,
  isPublishing: false,
  error: null,
  isFetchingStats: false,
  stats: {}
  }

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_TEST_CASES: {
      return {...state, testCases: [], isFetching: true}
    }
    case FETCH_TEST_CASES_DONE: {
      return {...state, testCases: payload, isFetching: false, error: null}
    }
    case FETCH_TEST_CASES_ERROR: {
      return {...state, error: payload, isFetching: false}
    }
    case CREATE_TEST_CASE: {
      return {...state, isCreating: true}
    }
    case CREATE_TEST_CASE_DONE: {
      return {...state, testCases: [...state.testCases, payload], isCreating: false}
    }
    case CREATE_TEST_CASE_ERROR: {
      return {...state, error: payload, isCreating: false}
    }
    case UPDATE_TEST_CASE: {
      return {...state, isUpdating: true}
    }
    case UPDATE_TEST_CASE_DONE: {
      return {...state, testCases: payload, isUpdating: false, error: null}
    }
    case UPDATE_TEST_CASE_ERROR: {
      return {...state, error: payload, isUpdating: false}
    }
    case DELETE_TEST_CASE: {
      return {...state, isUpdating: true}
    }
    case DELETE_TEST_CASE_DONE: {
      return {...state, testCases: payload, isUpdating: false, error: null}
    }
    case DELETE_TEST_CASE_ERROR: {
      return {...state, error: payload, isUpdating: false}
    }
    case PUBLISH_TEST_CASES: {
      return {...state, isPublishing: true}
    }
    case PUBLISH_TEST_CASES_DONE: {
      return {...state, isPublishing: false, error: null}
    }
    case PUBLISH_TEST_CASES_ERROR: {
      return {...state, error: payload, isPublishing: false}
    }
    case FETCH_STATS: {
      return {...state, isFetchingStats: true, error: null}
    }
    case FETCH_STATS_DONE: {
      return {...state, stats: payload, isFetchingStats: false, error: null}
    }
    case FETCH_STATS_ERROR: {
      return {...state, isFetchingStats: false, error: payload}
    }
    case CLEAR_TESTCASES: {
      return {...initialState, stats: state.stats}
    }
    default: {
      return state;
    }
  }
}