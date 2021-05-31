import {
  ADD_LOG,
} from "./types";

export const addLog = (title) => (
  {
    type: ADD_LOG, title,
  }
);
