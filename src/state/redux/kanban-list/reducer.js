import list from "state/redux/modules/list";
import { KANBAN_FILTER_TYPE } from "utils/constants";
import {
  FETCH_KANBAN_LIST,
  CREATE_KANBAN_LIST,
  UPDATE_KANBAN_LIST,
  UPDATE_KANBAN_FILTER,
} from "./types";

const kanbanFilter = {};

// for (const item of list) {
//   kanbanFilter[item.title] = {};
//   for (const filterType in KANBAN_FILTER_TYPE) {
//     kanbanFilter[item.title][KANBAN_FILTER_TYPE[filterType]] = [];
//   }
// }

list.forEach((listItem) => {
  kanbanFilter[listItem.title] = {};
  Object.values(KANBAN_FILTER_TYPE).forEach((filterTypeValue) => {
    kanbanFilter[listItem.title][filterTypeValue] = [];
  });
});

const initialState = {
  kanbanList: [],
  kanbanFilter,
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case FETCH_KANBAN_LIST: {
      return {
        ...state,
        kanbanList: payload,
      };
    }
    case CREATE_KANBAN_LIST: {
      return {
        ...state,
        kanbanList: payload,
      };
    }
    case UPDATE_KANBAN_LIST: {
      return {
        ...state,
        kanbanList: payload,
      };
    }
    case UPDATE_KANBAN_FILTER: {
      return {
        ...state,
        kanbanFilter: payload,
      };
    }
    default: {
      return state;
    }
  }
};
