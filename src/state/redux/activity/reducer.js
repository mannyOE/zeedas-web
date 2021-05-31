import { ADD_LOG, SET_ACTIVITY } from "./types";
import { initialState } from "../initialState";

export const INIT_STATE = {
  activity: {},
};

const activity = (state = INIT_STATE, action) => {
  const now = new Date().getTime();
  switch (action.type) {
    case ADD_LOG:
      return { ...state, title: action.title, lastSeen: now };
    default:
      return state;
  }
};

export default activity;
