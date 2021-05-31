import React from "react";
import { useSelector } from "react-redux";
import CommentsIcon from "zeedas-assets/icons/icon-comments";
import colors from "utils/colors";
import SingleCodeComment from "./single-code-comment";

const SingleCommentThread = ({ activeComment, className, onShowAll, hideNavigation = false }) => {
  const fileComments = useSelector((state) => state.comment.comments);
  const repliesCount = activeComment.replies.length;
  const commentThread = [activeComment, ...activeComment.replies];

  return (
    <div className={`Comment ${className}`}>
      <div className="d-flex">
        { !hideNavigation && (
          <div className="Comment__meta d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-self-start">
              <div className="d-flex align-items-center">
                <div className="pr-0 pl-1">
                  <a
                    className="Comment__toggle font-12"
                    style={{ top: "15px" }}
                    onClick={onShowAll}
                  >
                    <span className="zd-icon__left-arrow mr-1" />
                    <span>All</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex-grow-1">
{/*          <div className="Comment__meta d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex">
              <div className="d-flex align-items-center mr-2">
                <div className="pr-3">
                  <a
                    className="Comment__toggle font-12"
                    onClick={onShowAll}
                  >
                    <span className="zd-icon__left-arrow mr-1" />
                    <span>All</span>
                  </a>
                </div>

                <div className="Comment__status position-relative d-flex align-items-center justify-content-center">
                  <CommentsIcon
                    height="18"
                    width="18"
                    fill={repliesCount ? colors.ZEEDAS_ORANGE : colors.ZEEDAS_WHITE}
                  />
                   {fileComments.length > 0 && (
                  {repliesCount > 0 && (
                    <span className="Comment__reply-count">{repliesCount}</span>
                  )}
                </div>
              </div>
            </div>
          </div>*/}
          {commentThread.map((commentData, index, commentArray) => (
            /* <CommentText
              text={commentData.comment}
              key={index}
              className="my-2"
              showAvatar
              user={commentData.user}
            /> */
            <SingleCodeComment
              className={`px-2 pt-2 ${
                index < commentArray.length - 1 ? "border-bottom" : ""
              }`}
              commentData={commentData}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleCommentThread;
