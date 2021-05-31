import React, { useState, useEffect, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import "./style.scss";
import PropTypes from "prop-types";
import { comment as commentActions } from "state/redux/comment/actions";
import EmptyRecordMessage from "zeedas-components/empty-record-message";
import SingleCommentThread from "./_components/single-comment-thread";
import SingleCodeComment from "./_components/single-code-comment";
import SendCodeComment from "./_components/send-code-comment";

import { COMMENT_LEVELS, SELECTION_TYPES } from "../../../../../../state/redux/comment/types";
import { COMMENT_TYPES } from "../../../../../../utils/constants";
import { configSelectors } from "../../../../../../state/redux/config/actions";

//
const CodeReviewComments = (props) => {
  const {
    onCommentSent,
    //
    className,
    appId,
    moduleId,
    canComment = false,
    setCanComment,
    hideNavigation,
    onCancelComment = () => ({}),
    //
    $comments,
    $codeFragment,
    $reviewFileData,
    $$saveComment,
    $$replyComment,
    $$fetchComments,
    $$setCodeFragmentComments,
    $$setSelectedLines,
  } = props;

  const reviewFileVersionsByNewest = $reviewFileData
    ? $reviewFileData.versions.sort((a, b) => {
      if (new Date(a.created_at).getTime() > new Date(b.created_at).getTime()) {
        return -1;
      }
      return 1;
    })
    : [];

  const codeFragmentComments = $codeFragment && $codeFragment.comments.length
    ? $codeFragment.comments.map((singleComment) => {
      const tempSingleComment = { ...singleComment };

      if (reviewFileVersionsByNewest.length
        && new Date(tempSingleComment.createdAt).getTime()
        > new Date(reviewFileVersionsByNewest[0].created_at).getTime()
      ) {
        return tempSingleComment;
      }
    })
    : [];

  const showAll = () => {
    $$setSelectedLines([], SELECTION_TYPES.none);

    commentActions.filterAndSetCommentsByType(
      $comments,
      COMMENT_TYPES.class,
      [$$setCodeFragmentComments],
    );
    setCanComment(false);
  };

  const viewComment = (commentData) => {
    const highlightedLines = commentData.target.description.split(",");
    $$setSelectedLines(highlightedLines, SELECTION_TYPES.comment);
    $$setCodeFragmentComments([commentData], COMMENT_LEVELS.reply);
    setCanComment(true);
  };

  const handleSentCommentResponse = async (responseCommentArray) => {
    const fetchCommentsPayload = {
      app: appId,
      module: moduleId,
      target: $reviewFileData._id,
    };
    await $$fetchComments(fetchCommentsPayload);
    onCommentSent(responseCommentArray[0]);
    return responseCommentArray;
  };

  const sendComment = (commentText) => {
    const payload = {
      app: appId,
      module: moduleId,
      comment: commentText,
      target: {
        id: $reviewFileData._id,
        // TODO: change to COMMENT_TYPES.$codeFragment - MEL
        type: COMMENT_TYPES.class,
        description: $codeFragment.selectedLines.join(","),
      },
    };

    return $$saveComment(payload)
      .then((responseData) => handleSentCommentResponse(responseData));
  };

  const replyComment = (commentText) => {
    const payload = {
      // commentId: comments[0]._id,
      commentId: $codeFragment.comments[0]._id,
      comment: commentText,
    };

    return $$replyComment(payload)
      .then((responseData) => handleSentCommentResponse(responseData));
  };

  return (
    <div
      className={`CodeReviewComments d-flex flex-column h-100 pt-4 px-1 justify-content-between ${className}`}
    >
      { (!codeFragmentComments || !codeFragmentComments.length) && !canComment ? (
        <EmptyRecordMessage
          display="block"
          width={194}
          minHeight={300}
          textWidth="336px"
          message="Nothing to see here"
          className="d-flex flex-column align-items-center justify-content-between"
        />
      ) : $codeFragment.commentLevel === COMMENT_LEVELS.reply
        ? (
          <SingleCommentThread
            activeComment={$codeFragment.comments[0]}
            className="px-1 py-0"
            onShowAll={showAll}
            hideNavigation={hideNavigation}
          />
        ) : (
          <div
            className="pb-4"
            style={{
              height: "500px",
              overflowY: "scroll",
            }}
          >
            { codeFragmentComments.map((commentData, index, commentArray) => (
              <SingleCodeComment
                className={`px-2 pt-2 ${
                  // index < commentArray.length - 1 ? "" : ""
                  index < commentArray.length - 1 ? "border-bottom" : ""
                }`}
                commentData={commentData}
                hideNavigation={hideNavigation}
                key={index}
                onClick={(selectedComment) => viewComment(selectedComment)}
                // onClick={() => ({})}
              />
            ))}
          </div>
        )}

      { canComment && (
        <SendCodeComment
          onSendComment={sendComment}
          onReplyComment={replyComment}
          hideSendButton={hideNavigation}
          onCancel={onCancelComment}
        />
      )}
    </div>
  );
};

CodeReviewComments.defaultProps = {
  className: "",
};
CodeReviewComments.propTypes = {
  className: PropTypes.string,
};

const mapState = (state) => ({
  $comments: state.comment.comments,
  $codeFragment: state.comment.codeFragment,
  $reviewFileData: configSelectors.getCodeReview(state).reviewFileData,
});

const mapDispatch = {
  $$setCodeFragmentComments: commentActions.setCodeFragmentComments,
  $$setSelectedLines: commentActions.setSelectedLines,
  $$saveComment: commentActions.saveComment,
  $$replyComment: commentActions.replyComment,
  $$fetchComments: commentActions.fetchComments,
};

export default connect(mapState, mapDispatch)(CodeReviewComments);
