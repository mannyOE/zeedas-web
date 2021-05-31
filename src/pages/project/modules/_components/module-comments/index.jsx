import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import PropTypes from "prop-types";
import { comment } from "state/redux/comment/actions";
import EmptyRecordMessage from "zeedas-components/empty-record-message";
import SingleCommentThread from "./_components/single-comment-thread";
import SingleActivity from "./_components/single-activity";
import SendComment from "./_components/send-comment";

const ModuleComments = ({ task, className, canComment = false }) => {
  const dispatch = useDispatch();

  const {
    comments,
    commentTarget,
    loadingComments,
    moduleComments,
    allActivities,
  } = useSelector((state) => state.comment);

  const monitoredActivities = [];

  allActivities.forEach((activity, index, activityArray) => {
    if (Array.isArray(activity)) {
      if (index === activity.length - 1) {
        monitoredActivities.concat(activity);
      }
    } else {
      monitoredActivities.push(activity);
    }
  });

  const { activePlan } = useSelector((state) => state.planning);

  const showAll = () => {
    dispatch(
      comment.setCommentTarget({
        app: activePlan.app,
        module: activePlan.module,
      }),
    );
  };

  const viewComment = (commentData) => {
    dispatch(
      comment.setCommentTarget({
        app: commentData.app,
        module: commentData.module,
        id: commentData.target.id,
        type: commentData.target.class,
        name: commentData.target.name,
      }),
    );
    dispatch(comment.setComments([commentData]));
  };

  return (
    <div
      className={`ModuleComments d-flex flex-column h-100 pt-4 justify-content-between ${className}`}
    >
      { !monitoredActivities || !monitoredActivities.length ? (
        <EmptyRecordMessage
          display="block"
          width={194}
          minHeight={300}
          textWidth="336px"
          message="Nothing to see here"
          className="d-flex flex-column align-items-center justify-content-between"
        />
      ) : (
        <div
          className="pb-4"
          style={{
            height: "500px",
            overflowY: "scroll",
          }}
        >
          {/* { moduleComments.map((commentData, index, moduleCommentArray) => ( */}
          { monitoredActivities.map((activityData, index, activityArray) => (
            <SingleActivity
              className={`px-2 pt-2 ${
                // index < activityArray.length - 1 ? "border-bottom" : ""
                index < activityArray.length - 1 ? "" : ""
              }`}
              commentData={activityData}
              key={index}
              onClick={() => ({})}
              // onClick={(comment) => viewComment(comment)}
            />
          ))}
        </div>
      )}

      { canComment && (
        <SendComment activeComment={comments[0]} task={task} />
      )}
    </div>
  );

  //
/*  return (
    <div
      className={`ModuleComments d-flex flex-column h-100 justify-content-between ${className}`}
      style={{ border: "1px solid red" }}
    >
      { !comments.length && loadingComments ? (
        <>
          {commentTarget.id ? (
            <div className="d-flex h-100 align-items-center justify-content-center font-14">
              Begin a thread on this
              {" "}
              {commentTarget.type}
              {" "}
              &nbsp;
              <span style={{ opacity: "0.6" }}>{commentTarget.name}</span>
            </div>
          ) : (
            <EmptyRecordMessage
              display="block"
              width={194}
              minHeight={300}
              textWidth="336px"
              message="Nothing to see here"
              className="d-flex flex-column align-items-center justify-content-between"
            />
          )}
        </>
      ) : commentTarget.id && comments[0] ? (
        <SingleCommentThread
          activeComment={comments[0]}
          className="px-4 py-3"
          onShowAll={showAll}
        />
      ) : (
        <div className="pb-4">
          {moduleComments.map((commentData, index) => (
            <SingleComment
              className={`px-4 py-3 ${
                index < comments.length - 1 ? "border-bottom" : ""
              }`}
              commentData={commentData}
              key={index}
              onClick={(comment) => viewComment(comment)}
            />
          ))}
        </div>
      )}

      {commentTarget.id && (
        <SendComment activeComment={comments[0]} task={task} />
      )}
    </div>
  ); */
};

ModuleComments.defaultProps = {
  className: "",
};
ModuleComments.propTypes = {
  className: PropTypes.string,
};

export default ModuleComments;
