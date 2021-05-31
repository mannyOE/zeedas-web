import { AUTH_BASE_URL } from "utils/constants";
import { serviceHelpers } from "../utils/service-helpers";

const COMMENTS_BASE_URL = `${AUTH_BASE_URL}/notifications/comments`;
const ACTIVITIES_BASE_URL = `${AUTH_BASE_URL}/notifications/activities`;

const api = {
  FETCH_COMMENTS: `${COMMENTS_BASE_URL}`,

  SAVE_COMMENT: `${COMMENTS_BASE_URL}/create-comment`,

  REPLY_COMMENT: `${COMMENTS_BASE_URL}/reply-to-comment`,

  RESOLVE_COMMENT: `${COMMENTS_BASE_URL}/resolve-comment`,

  COMMENT_TYPES: `${COMMENTS_BASE_URL}/fetch-comment-types`,

  FETCH_ACTIVITIES: `${ACTIVITIES_BASE_URL}`,
};

const fetchComments = (payload) => serviceHelpers.genericRequest("post", api.FETCH_COMMENTS, payload);
const saveComment = (payload) => serviceHelpers.genericRequest("post", api.SAVE_COMMENT, payload);
const replyComment = (payload) => serviceHelpers.genericRequest("post", api.REPLY_COMMENT, payload);
const resolveComment = (payload) => serviceHelpers.genericRequest("post", api.RESOLVE_COMMENT, payload);
const fetchCommentTypes = () => serviceHelpers.genericRequest("get", api.COMMENT_TYPES);

const fetchActivity = (userOrModule, userOrModuleId) => (
  serviceHelpers.genericRequest("get", `${api.FETCH_ACTIVITIES}/?${userOrModule}=${userOrModuleId}`)
);

export const commentService = {
  fetchComments,
  saveComment,
  replyComment,
  resolveComment,
  fetchCommentTypes,
  fetchActivity,
};
