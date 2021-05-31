import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import commentIcon from "zeedas-assets/icons/icon-activity-comment.svg";
import AvatarSingle from "zeedas-components/avatar-single";
import moment from "moment";
import CommentText from "./comment-text";
import CommentsIcon from "../../../../../../../zeedas-assets/icons/icon-comments";
import colors from "../../../../../../../utils/colors";
import { COMMENT_LEVELS } from "../../../../../../../state/redux/comment/types";

const SingleCodeComment = ({ className, commentData, onClick, hideNavigation = false }) => {
  const commentLevel = useSelector((state) => state.comment.codeFragment.commentLevel);
  const commentBoxRef = useRef();
  // const [trailHeight, setTrailHeight] = useState("50px");

  const hasReplies = Boolean(commentData.replies);
  const repliesCount = hasReplies ? commentData.replies.length : 0;
  const highlightedLines = hasReplies && commentData.target ? commentData.target.description.split(",") : [];
  const actor = commentData.user;

  useEffect(() => {
    // if (commentBoxRef.current) {
    //   const commentBoxHeight = window.getComputedStyle(commentBoxRef.current)
    //   .height.replace("px", "");
    //   setTrailHeight(`${+commentBoxHeight - 38}px`);
    // }
  }, []);

  return (
    <div className={`Comment ${className} w-100`}>
      <div className="d-flex">
        <div className="d-flex flex-grow-1">

          { hasReplies && commentLevel === COMMENT_LEVELS.top && !hideNavigation && (
            <div className="mt-2 ml-0">
              <a
                className="Comment__toggle font-12"
                onClick={() => onClick(commentData)}
              >
                <span className="zd-icon__down-arrow mr-1" />
                <span>Replies</span>
              </a>
            </div>
          )}

          <div className="Comment__meta mb-2 ml-2 w-100" ref={commentBoxRef}>
            <div className="Comment__meta mb-2 w-100">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">

{/*                  <div className="Comment__status position-relative d-flex align-items-center justify-content-center">
                    <CommentsIcon
                      height="13"
                      width="13"
                      fill={
                        commentData.replies.length ? colors.ZEEDAS_ORANGE : colors.ZEEDAS_WHITE
                      }
                    />
                    {commentData.replies.length > 0 && (
                      <span className="Comment__reply-count">
                        { commentData.replies.length }
                      </span>
                    )}
                  </div> */}
                  { hasReplies && commentLevel === COMMENT_LEVELS.top && (
                    <div
                      className="Comment__status position-relative d-flex align-items-center justify-content-center mr-2"
                      onClick={() => onClick(commentData)}
                    >
                      <CommentsIcon
                        height="18"
                        width="18"
                        fill={
                          repliesCount ? colors.ZEEDAS_ORANGE : colors.ZEEDAS_WHITE
                        }
                      />
                      {repliesCount > 0 && (
                        <span className="Comment__reply-count">
                          { repliesCount }
                        </span>
                      )}
                    </div>
                  )}

                  <AvatarSingle
                    item={{ user: actor }}
                    className="CommentAuthorAvatar mr-2"
                  />
                  <span className="Comment__author font-12">
                    {actor.name}
                  </span>
                </div>
                <div className="Comment__date font-12 ml-auto mr-4">
                  <span>{moment(commentData.createdAt).fromNow()}</span>
                  <img src="" alt="" />
                </div>
              </div>

              { commentData.target && highlightedLines.length
                ? (
                  <div className="Comment__desc font-12 my-3">
                    <span className="font-weight-bold Comment__type mr-1">
                      Commented on
                      {" "}
                      { highlightedLines.length > 1 ? "lines" : "line" }
                    </span>
                    {" "}
                    <span className="Comment__object">
                      { highlightedLines.length > 1
                        ? `${highlightedLines[0].replace("line-", "")} to ${
                          highlightedLines[highlightedLines.length - 1].replace("line-", "")}`
                        : `${highlightedLines[0].replace("line-", "")}`
                      }
                    </span>
                  </div>
                ) : (
                  <div className="Comment__desc font-12 my-3">
                    <span className="font-weight-bold Comment__type mr-1">
                      Replied
                    </span>
                  </div>
                )}
            </div>
              <CommentText
                text={commentData.comment}
                className="mt-3 mb-1"
                showAvatar={false}
              />
          </div>
{/*          <div className="mt-2">
            <a
              className="Comment__toggle font-12"
              onClick={() => onClick(commentData)}
            >
              <span>Replies</span>
              <span className="zd-icon__down-arrow ml-1" />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleCodeComment;
