import { v4 } from "uuid";
import {
  FETCH_KANBAN_LIST,
  CREATE_KANBAN_LIST,
  UPDATE_KANBAN_LIST,
  UPDATE_KANBAN_FILTER,
} from "./types";
import { store } from "../store";

export const kanbanListSelector = (state) => state.kanbanlist.kanbanList;

export const fetchKanbanList = (list) => (dispatch) => {
  dispatch({
    type: FETCH_KANBAN_LIST,
    payload: list,
  });
};

export const createKanbanList = () => (dispatch) => {
  const list = {
    id: v4(),
    droppableId: v4(),
    title: "",
    tasks: [],
  };
  const state = store.getState();
  const kanbanList = kanbanListSelector(state);
  const newList = [...kanbanList, list];

  dispatch({
    type: CREATE_KANBAN_LIST,
    payload: newList,
  });
};

export const updateKanbanList = (id, payload) => (dispatch) => {
  const state = store.getState();
  const kanbanList = kanbanListSelector(state);
  const index = kanbanList.findIndex((list) => list.droppableId === id);
  kanbanList[index] = { ...kanbanList[index], ...payload };
  dispatch({
    type: UPDATE_KANBAN_LIST,
    payload: kanbanList,
  });
};

export const addKanbanFilter = (listTitle, filterBy, id) =>
  /**
   * Add filter to a list on the kanban board
   *
   * @param {string} listTitle the title of the kanban list
   * @param {string} filterBy the category of the filter e.g app, user
   * @param {string} id the id of the item to be added to the filter
   *
   */
  (dispatch) => {
    const state = store.getState();
    const kanbanFilter = { ...state.kanbanlist.kanbanFilter };
    if (!kanbanFilter[listTitle]) kanbanFilter[listTitle] = {};
    if (kanbanFilter[listTitle][filterBy].includes(id)) return;
    kanbanFilter[listTitle][filterBy].push(id);

    dispatch({
      type: UPDATE_KANBAN_FILTER,
      payload: kanbanFilter,
    });
  };
export const removeKanbanFilter = (listTitle, filterBy, id) =>
/**
   * Remove filter from a list on the kanban board
   *
   * @param {string} listTitle the title of the kanban list
   * @param {string} filterBy the category of the filter e.g app, user
   * @param {string} id the id of the item to be removed from the filter
   *
   */

  (dispatch) => {
    const state = store.getState();
    const kanbanFilter = { ...state.kanbanlist.kanbanFilter };
    if (!kanbanFilter[listTitle] || !kanbanFilter[listTitle][filterBy]) return;

    const index = kanbanFilter[listTitle][filterBy].indexOf(id);
    if (index > -1) {
      kanbanFilter[listTitle][filterBy].splice(index, 1);
    }

    dispatch({
      type: UPDATE_KANBAN_FILTER,
      payload: kanbanFilter,
    });
  };
