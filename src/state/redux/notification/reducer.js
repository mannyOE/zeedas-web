import {
  SET_TOKEN,
  CLEAR_TOKEN,
  SET_NOTIFICATION,
  CLEAR_NEW_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
  TEMP,
} from "./types";

const INIT_STATE = {
  token: "",
  temp: [],
  allNotifications: [],
  newNotifications: [],
  newNotificationsCount: 0,
};

const notificationReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };

    case CLEAR_TOKEN:
      return INIT_STATE;

    case SET_NOTIFICATION:
      return {
        ...state,
        allNotifications: action.payload.notification,
        newNotifications: action.payload.notification,
        newNotificationsCount: action.payload.notification.length,
      };
      // return {
      //   ...state,
      //   allNotifications: [action.payload.notification, ...state.allNotifications],
      //   newNotifications: [action.payload.notification, ...state.newNotifications],
      //   newNotificationsCount: [action.payload.notification, ...state.newNotifications].length,
      // };

    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        allNotifications: [],
        newNotifications: [],
        newNotificationsCount: 0,
      };

    case CLEAR_NEW_NOTIFICATIONS:
      return {
        ...state,
        newNotifications: [],
        newNotificationsCount: 0,
      };

    case TEMP:
      return {
        ...state,
        temp: [action.payload.notification, ...state.temp],
      };

    default:
      return state;
  }
};

export default notificationReducer;
