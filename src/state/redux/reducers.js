import { combineReducers } from "redux";
import settings from "./settings/reducer";
import shared from "./shared/reducer";
import modules from "./modules/reducer";
import kanbanlist from "./kanban-list/reducer";
import activityReducer from "./activity/reducer";
import test from "./test/reducer";
import auth from "./auth/reducer";
import requests from "./requests/reducer";
import config from "./config/reducer";
import {
  walletStatistics,
  walletActivities,
  billing,
  walletCards,
  clientsIP,
} from "./wallet/reducer";
import users from "./users/reducer";
import projects from "./project/reducer";
import header from "./app-header/reducer";
import planning from "./planning/reducer";
import comment from "./comment/reducer";
import notificationReducer from "./notification/reducer";

const reducers = combineReducers({
  settings,
  activityReducer,
  auth,
  walletStatistics,
  walletActivities,
  billing,
  walletCards,
  clientsIP,
  requests,
  users,
  config,
  notification: notificationReducer,
  modules,
  kanbanlist,
  test,
  projects,
  shared,
  header,
  planning,
  comment,
});

export default reducers;
