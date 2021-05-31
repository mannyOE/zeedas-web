import { fetchCountries } from 'services/shared-service';
import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_ERROR,
  FETCH_COUNTRIES_SUCCESS,
} from './types';

export const fetchCountryList = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COUNTRIES });
    fetchCountries(['name', 'flag', 'currencies', 'callingCodes'])
      .then((countries) => {
        dispatch({
          type: FETCH_COUNTRIES_SUCCESS,
          payload: countries,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_COUNTRIES_ERROR, payload: error });
      });
  };
};
