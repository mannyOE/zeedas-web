import { addLog } from "../redux/activity/actions";
import { ADD_LOG } from "../redux/activity/types";
import { NOTIFICATION_FAILURE } from "../../constants";
import { notify } from "../../zeedas-components/bottom-notification";
import { APP_USER_SESSION_EXPIRED_MESSAGE } from "../../utils/constants";

const activityMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  if (
    action.type !== ADD_LOG
  ) {
    const lastActivity = getState().activity;
    if (lastActivity) {
      const now = new Date().getTime();
      const { lastSeen } = getState().activity;
      const seconds = (now - lastSeen) / 1000;
      const expiryTimeInSeconds = getState().auth.accessToken.expires / 1000;
      if (seconds > expiryTimeInSeconds) {
        notify(APP_USER_SESSION_EXPIRED_MESSAGE, NOTIFICATION_FAILURE);
        window.location.assign("/authentication/login");
      } else {
        next(action);
      }
    } else {
      next(action);
    }
    dispatch(addLog(action.type));
  } else {
    next(action);
  }
};

export default activityMiddleware;
