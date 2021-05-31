import React from "react";
import CommentsIcon from "zeedas-assets/icons/icon-comments";
import colors from "utils/colors";
import CommentAuthorAvatar from "./comment-author-avatar";
import CommentText from "./comment-text";

const SingleCommentThread = ({ activeComment, className, onShowAll }) => {
  const repliesCount = activeComment.replies.length;
  const commentThread = [activeComment, ...activeComment.replies];

  return (
    <div className={`Comment ${className}`}>
      <div className="d-flex">
        <div className="pr-3">
          <a
            className="Comment__toggle font-12"
            onClick={() => onShowAll()}
          >
            <span className="zd-icon__left-arrow mr-1" />
            <span>All</span>
          </a>
        </div>
        <div className="flex-grow-1">
          <div className="Comment__meta d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex">
              <div
                className="d-flex align-items-start
                    mr-2"
              >
                <div className="Comment__status position-relative d-flex align-items-center justify-content-center">
                  <CommentsIcon
                    height="13"
                    width="13"
                    fill={
                      repliesCount ? colors.ZEEDAS_ORANGE : colors.ZEEDAS_WHITE
                    }
                  />
                  {repliesCount > 0 && (
                    <span className="Comment__reply-count">{repliesCount}</span>
                  )}
                </div>
              </div>
              <div className="Comment__desc font-12 mb-2">
                <span className="font-weight-bold Comment__type">
                  Commented on this
                  {" "}
                  {activeComment.target.type}
                </span>
                {" "}
                <span className="Comment__object">
                  {activeComment.target.description}
                </span>
              </div>
            </div>
          </div>
          {commentThread.map((commentData, index) => (
            <CommentText
              text={commentData.comment}
              key={index}
              className="my-2"
              showAvatar
              user={commentData.user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleCommentThread;
