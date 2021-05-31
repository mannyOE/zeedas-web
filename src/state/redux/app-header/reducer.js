import { PAGE_TITLE } from './types';

const initialState = {
  pageTitle: '',
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PAGE_TITLE: {
      return { ...state, pageTitle: payload };
    }
    default: {
      return state;
    }
  }
};
