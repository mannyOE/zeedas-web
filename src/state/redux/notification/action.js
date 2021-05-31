import {
  SET_TOKEN,
  CLEAR_TOKEN,
  SET_NOTIFICATION,
  CLEAR_NEW_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
  TEMP,
} from "./types";

export const setNotificationToken = (token) => (
  {
    type: SET_TOKEN,
    payload: {
      token,
    },
  }
);

export const clearNotificationToken = () => (
  {
    type: CLEAR_TOKEN,
  }
);

export const setNotifications = (notification) => (
  {
    type: SET_NOTIFICATION,
    payload: {
      notification,
    },
  }
);

export const clearNotifications = () => (
  {
    type: CLEAR_NOTIFICATIONS,
  }
);

export const clearNewNotifications = () => (
  {
    type: CLEAR_NEW_NOTIFICATIONS,
  }
);

export const addTemp = (notification) => (
  {
    type: TEMP,
    payload: {
      notification,
    },
  }
);
