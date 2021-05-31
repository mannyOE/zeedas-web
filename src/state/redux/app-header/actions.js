import { PAGE_TITLE } from './types';

export const setPageTitle = (pageTitle) => {
  return (dispatch) => {
    dispatch({ type: PAGE_TITLE, payload: pageTitle });
  };
};
