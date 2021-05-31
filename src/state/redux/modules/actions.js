import { fetchStats } from "state/redux/test/actions";
import * as moduleService from "../../../services/kanban-service";
import * as appService from "../../../services/app-service";
import {
  MODULES_FETCHING,
  MODULES_FETCHING_DONE,
  MODULES_FETCHING_ERROR,
  MODULE_CREATE,
  MODULE_CREATE_DONE,
  MODULE_CREATE_ERROR,
  MODULE_DELETE,
  MODULE_DELETE_DONE,
  MODULE_DELETE_ERROR,
  MODULE_UPDATE,
  MODULE_UPDATE_DONE,
  MODULE_UPDATE_ERROR,
  FETCH_APP_DONE,
  FETCH_APP,
  FETCH_APP_ERROR,
  MODULE_PUBLISH,
  MODULE_PUBLISH_DONE,
  MODULE_PUBLISH_ERROR,
} from "./types";
import { store } from "../store";
import { fetchKanbanList } from "../kanban-list/actions";
import list from "./list";

export const modulesSelector = (state) => state.modules.module;
export const appSelector = (state) => state.modules.app;

const listModulesActions = {
  request: () => ({ type: MODULES_FETCHING }),
  receive: (payload) => ({ type: MODULES_FETCHING_DONE, payload }),
  failed: (payload) => ({ type: MODULES_FETCHING_ERROR, payload }),
};

const createModuleActions = {
  request: () => ({ type: MODULE_CREATE }),
  receive: (payload) => ({ type: MODULE_CREATE_DONE, payload }),
  failed: (payload) => ({ type: MODULE_CREATE_ERROR, payload }),
};

const updateModuleActions = {
  request: () => ({ type: MODULE_UPDATE }),
  receive: (payload) => ({ type: MODULE_UPDATE_DONE, payload }),
  failed: (payload) => ({ type: MODULE_UPDATE_ERROR, payload }),
};

const deleteModuleActions = {
  request: () => ({ type: MODULE_DELETE }),
  receive: (payload) => ({ type: MODULE_DELETE_DONE, payload }),
  failed: (payload) => ({ type: MODULE_DELETE_ERROR, payload }),
};

const fetchAppActions = {
  request: () => ({ type: FETCH_APP }),
  receive: (payload) => ({ type: FETCH_APP_DONE, payload }),
  failed: (payload) => ({ type: FETCH_APP_ERROR, payload }),
};

const publishModuleActions = {
  request: () => ({ type: MODULE_PUBLISH }),
  receive: (payload) => ({ type: MODULE_PUBLISH_DONE, payload }),
  failed: (payload) => ({ type: MODULE_PUBLISH_ERROR, payload }),
};

export const getApps = (project_id) => {
  const { receive, request, failed } = fetchAppActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      const { data } = await appService.fetchApp(project_id);
      dispatch(receive(data));
    } catch (e) {
      dispatch(failed(e));
    }
  };
};

export const listModules = (project_id) => {
  const { receive, request, failed } = listModulesActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      fetchKanbanList([...list])(dispatch);
      getApps(project_id)(dispatch);
      const { data } = await moduleService.fetchModules(project_id);
      dispatch(receive(data));
    } catch (error) {
      dispatch(failed(error));
    }
  };
};

export const createModule = (payload) => {
  const { receive, request, failed } = createModuleActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      const { data } = await moduleService.createModule(payload);
      dispatch(receive(data));
    } catch (error) {
      dispatch(failed(error));
    }
  };
};

export const deleteModule = (id) => {
  const { receive, request, failed } = deleteModuleActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      await moduleService.deleteModule(id);
      const state = store.getState();
      const modules = modulesSelector(state);
      const newModules = modules.filter(({ _id }) => _id !== id);
      dispatch(receive([...newModules]));
    } catch (error) {
      dispatch(failed(error));
    }
  };
};

export const updateModule = (id, payload) => {
  const { receive, request, failed } = updateModuleActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      const { data } = await moduleService.updateModule(id, payload);
      const state = store.getState();
      const modules = modulesSelector(state);
      const newModules = modules.filter(({ _id }) => _id !== id);
      dispatch(receive([...newModules, data]));
      return Promise.resolve();
    } catch (error) {
      dispatch(failed(error));
      return Promise.reject();
    }
  };
};

export const publishModule = (moduleId, projectId) => {
  const { receive, request, failed } = publishModuleActions;
  return async (dispatch) => {
    dispatch(request());
    try {
      const { data } = await moduleService.publishModule(moduleId);
      dispatch(listModules(projectId));
      dispatch(receive(data));
      dispatch(fetchStats(projectId)(dispatch));
    } catch (e) {
      dispatch(failed(e));
    }
  };
};
