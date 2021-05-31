import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_ERROR,
  FETCH_COUNTRIES_SUCCESS,
} from './types';

const initialState = {
  countriesList: [],
  fetchingCountries: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COUNTRIES: {
      return { ...state, fetchingCountries: true, error: null };
    }
    case FETCH_COUNTRIES_SUCCESS: {
      return {
        ...state,
        countriesList: payload,
        fetchingCountries: false,
        error: null,
      };
    }
    case FETCH_COUNTRIES_ERROR: {
      return { ...state, fetchingCountries: false, error: null };
    }
    default: {
      return state;
    }
  }
};
