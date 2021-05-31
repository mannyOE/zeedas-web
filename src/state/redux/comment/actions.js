import { commentService } from "services/comment-service";
import {
  SET_COMMENTS,
  SET_MODULE_COMMENTS,
  SET_COMMENT_TARGET,
  SET_LOADING_COMMENTS,
  RESET_COMMENTS,
  SET_ACTIVITY,
  SET_FRAGMENT_COMMENTS,
  SET_FRAGMENT_SELECTED_LINES,
  RESET_CODE_FRAGMENT,
  COMMENT_LEVELS, RESET_SELECTED_LINES,
} from "./types";

const fetchComments = (payload) => (dispatch) => {
  dispatch({ type: SET_LOADING_COMMENTS, payload: true });
  return commentService
    .fetchComments(payload)
    .then((response) => {
      if (payload.target) {
        dispatch({ type: SET_COMMENTS, payload: response.data });
      } else {
        dispatch({ type: SET_MODULE_COMMENTS, payload: response.data });
      }
      return Promise.resolve(response);
    })
    .catch((err) => Promise.reject(err))
    .finally(() => ({ type: SET_LOADING_COMMENTS, payload: false }));
};

const saveComment = (payload) => (dispatch) => commentService
  .saveComment(payload)
  .then((response) => {
    dispatch({ type: SET_COMMENTS, payload: response.data });
    return Promise.resolve(response.data);
  })
  .catch((err) => Promise.resolve(err));

const replyComment = (payload) => (dispatch) => commentService
  .replyComment(payload)
  .then((response) => {
    const { commentId } = payload;
    const comments = response.data;
    const updatedComment = comments.find(
      (comment) => comment._id === commentId,
    );
    dispatch({ type: SET_COMMENTS, payload: [updatedComment] });
    return Promise.resolve(response.data);
  })
  .catch((err) => Promise.resolve(err));

const resolveComment = (payload) => (dispatch) => commentService
  .resolveComment(payload)
  .then((response) => {
    dispatch({ type: SET_COMMENTS, payload: response.data });
    return Promise.resolve(response);
  })
  .catch((err) => Promise.resolve(err));

const setCommentTarget = (payload) => (dispatch) => {
  dispatch({ type: SET_COMMENT_TARGET, payload });
  const { app, module, id } = payload;
  const commentsPayload = {
    app,
    module,
  };
  // TODO: check if commenting line below broke anything - MEL
  // if (id) commentsPayload.target = id;
  return dispatch(fetchComments(commentsPayload));
};

const fetchActivities = (userOrModule, userOrModuleId) => (dispatch) => (
  commentService
    .fetchActivity(userOrModule, userOrModuleId)
    .then((response) => {
      dispatch({
        type: SET_ACTIVITY,
        payload: {
          allActivities: response.data,
        },
      });
      return Promise.resolve(response.data);
    })
    .catch((err) => Promise.reject(err))
);

const clearActivities = () => ({
  type: SET_ACTIVITY,
  payload: {
    allActivities: [],
  },
});

const setSelectedLines = (selectedLines, selectionType) => ({
  type: SET_FRAGMENT_SELECTED_LINES,
  payload: {
    selectedLines,
    selectionType,
  },
});

const setCodeFragmentComments = (comments, commentLevel = COMMENT_LEVELS.top) => ({
  type: SET_FRAGMENT_COMMENTS,
  payload: {
    comments,
    commentLevel,
  },
});

const resetCodeFragment = () => ({ type: RESET_CODE_FRAGMENT });
const resetSelectedLines = () => ({ type: RESET_SELECTED_LINES });

const setComments = (payload) => ({ type: SET_COMMENTS, payload });
const setCommentsByTarget = (payload) => {
  if (payload.target) {
    return { type: SET_COMMENTS, payload };
  }
  return { type: SET_MODULE_COMMENTS, payload };
};

const reset = () => ({ type: RESET_COMMENTS });

/* ************************ */
/* COMMENT HELPER METHODS */
/* ******************** */
const filterAndSetCommentsByType = (commentArray, desiredCommentType, setterArray = []) => {
  const tempComments = commentArray.filter((singleComment) => (
    singleComment.target.type === desiredCommentType
  ));

  if (setterArray.length) {
    setterArray.forEach((setter) => {
      setter(tempComments);
    });
  }

  return tempComments;
};

// eslint-disable-next-line import/prefer-default-export
export const comment = {
  fetchComments,
  saveComment,
  replyComment,
  resolveComment,
  setCommentTarget,
  fetchActivities,
  clearActivities,
  setComments,
  setCommentsByTarget,
  setCodeFragmentComments,
  setSelectedLines,
  resetCodeFragment,
  resetSelectedLines,
  reset,
  //
  filterAndSetCommentsByType,
};
