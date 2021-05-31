import {
  SET_COMMENT_TARGET,
  SET_COMMENTS,
  SET_MODULE_COMMENTS,
  SET_COMMENT_REPLIES,
  SET_LOADING_COMMENTS,
  SET_ACTIVITY,
  SET_FRAGMENT_COMMENTS,
  SET_FRAGMENT_SELECTED_LINES,
  RESET_CODE_FRAGMENT,
  SELECTION_TYPES,
  COMMENT_LEVELS,
  RESET_COMMENTS, RESET_SELECTED_LINES,
} from "./types";

const INIT_STATE = {
  commentTarget: {
    id: "",
    type: "",
    name: "",
  },
  comments: [],
  codeFragment: {
    comments: [],
    commentLevel: COMMENT_LEVELS.none,
    selectedLines: [],
    selectionType: SELECTION_TYPES.none,
  },
  moduleComments: [],
  loadingComments: false,
  allActivities: [],
};

const comment = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_COMMENT_TARGET:
      return {
        ...state,
        commentTarget: action.payload,
      };

    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    case SET_MODULE_COMMENTS:
      return {
        ...state,
        moduleComments: action.payload,
      };

    case SET_COMMENT_REPLIES:
      const { comments } = state;
      comments.replies = action.payload;
      return {
        ...state,
        comments,
      };

    case SET_LOADING_COMMENTS:
      return {
        ...state,
        loadingComments: action.payload,
      };

    case SET_ACTIVITY:
      return {
        ...state,
        allActivities: action.payload.allActivities,
      };

    case SET_FRAGMENT_COMMENTS:
      return {
        ...state,
        codeFragment: {
          selectedLines: state.codeFragment.selectedLines,
          selectionType: state.codeFragment.selectionType,
          comments: action.payload.comments,
          commentLevel: action.payload.commentLevel,
        },
      };

    case SET_FRAGMENT_SELECTED_LINES:
      return {
        ...state,
        codeFragment: {
          comments: state.codeFragment.comments,
          commentLevel: state.codeFragment.commentLevel,
          selectedLines: action.payload.selectedLines,
          selectionType: action.payload.selectionType,
        },
      };

    case RESET_SELECTED_LINES:
      return {
        ...state,
        codeFragment: {
          comments: state.codeFragment.comments,
          commentLevel: state.codeFragment.commentLevel,
          selectionType: INIT_STATE.codeFragment.selectionType,
          selectedLines: INIT_STATE.codeFragment.selectedLines,
        },
      };

    case RESET_CODE_FRAGMENT:
      return {
        ...state,
        codeFragment: INIT_STATE.codeFragment,
      };

    case RESET_COMMENTS:
      return INIT_STATE;

    default:
      return state;
  }
};

export default comment;
