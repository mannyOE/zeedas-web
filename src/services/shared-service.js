import { serviceHelpers } from '../utils/service-helpers';
import { COUNTRIES_API } from '../utils/constants';

/* 
    @params fields - an array of api filters
*/
export const fetchCountries = (fields) => {
  const url = `${COUNTRIES_API}?fields=${fields.join(';')}`;
  return fetch(url).then(response => response.json());
};
