import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CommentsIcon from "zeedas-assets/icons/icon-comments";
import activityIcon from "zeedas-assets/icons/icon-activity-completed.svg";
import commentIcon from "zeedas-assets/icons/icon-activity-comment.svg";
import colors from "utils/colors";
import AvatarSingle from "zeedas-components/avatar-single";
import moment from "moment";
import CommentText from "./comment-text";
import { ACTIVITY_ACTION_TYPES } from "../../../../../../utils/constants";

const SingleActivity = ({ className, commentData, onClick }) => {
  // const repliesCount = commentData.replies.length;
  const users = useSelector((state) => state.users.teamsList);
  const modules = useSelector((state) => state.modules.module);
  const commentBoxRef = useRef();
  const [trailHeight, setTrailHeight] = useState("50px");

  const allUsers = [...users.coreTeam, ...users.contractTeam];

  const moduleSelector = (moduleId) => (
    modules.find((singleModule) => singleModule._id === moduleId)
  );

  const userSelector = (userId) => (
    allUsers.find((singleUser) => singleUser.user._id === userId)
  );

  const activityIconSelector = () => (
    commentData.type === "activity"
      ? ACTIVITY_ACTION_TYPES[commentData.action].icon
      : commentIcon
  );

  const actor = userSelector(commentData.user);
  const recipient = userSelector(commentData.recipient);
  const module = moduleSelector(commentData.module);

  const activityDescriptionSelector = () => {
    // if (commentData.target.nextAction) {
    //   // if (recipient
    //   // && (commentData.action === "assign-task" || commentData.action === "unassigned")
    //   // ) {
    //   if (recipient && (commentData.action === "assign-task")) {
    //     console.log("RECIPIENT NAME:", recipient.user.name);
    //     return recipient.user.name;
    //   }
    //   return ACTIVITY_ACTION_TYPES[commentData.target.nextAction].nextAction;
    // }
    if (recipient && (commentData.action === "assign-task")) {
      return recipient.user.name;
    }
    // return commentData.moduleName;
    return module.name;
  };

  const commentDescription = () => {
    //
    if (commentData.type === "comment") {
      return (
        <>
          <span className="font-weight-bold Comment__type mr-1">
            Commented on the module
            {/* {" "} */}
            {/* {commentData.target.type} */}
          </span>
          {" "}
          <span className="Comment__object">
            {/* {commentData.target.description} */}
            { module.name }
          </span>
        </>
      );
    }

    if (commentData.type === "activity") {
      return (
        <>
          <span className="font-weight-bold Comment__type mr-1">
            {ACTIVITY_ACTION_TYPES[commentData.action].action}
            {/* {" "} */}
            {/* {commentData.target.nextAction && commentData.recipient ? "" : "module"} */}
          </span>
          {" "}
          <span className="Comment__object">
            { activityDescriptionSelector() }
          </span>
        </>
      );
    }
  };

  useEffect(() => {
    if (commentBoxRef.current) {
      const commentBoxHeight = window.getComputedStyle(commentBoxRef.current).height.replace("px", "");
      setTrailHeight(`${+commentBoxHeight - 38}px`);
    }
  }, []);

  return (
    <div className={`Comment ${className} w-100`}>
      <div className="d-flex">
        {/* <div className="d-flex flex-grow-1 pr-3"> */}
        <div className="d-flex flex-grow-1">

          <div className="Comment__meta mb-2 mr-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex flex-column align-items-center justify-content-start">
                <div className="Comment__status position-relative mb-3 d-flex align-items-center justify-content-center">
                  {/*<CommentsIcon*/}
                  {/*  height="13"*/}
                  {/*  width="13"*/}
                  {/*  fill={colors.ZEEDAS_ORANGE}*/}
                  {/*/>*/}
                  <img src={activityIconSelector()} alt="" className="activity-icon"/>
                </div>
                <div
                  className=""
                  style={{
                    backgroundColor: "rgba(3, 41, 61, 0.05)",
                    width: "2px",
                    height: trailHeight,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="Comment__meta mb-2 ml-2 w-100" ref={commentBoxRef}>
            <div className="Comment__meta mb-2 w-100">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <AvatarSingle
                    item={{ user: actor.user }}
                    className="CommentAuthorAvatar mr-2"
                  />
                  <span className="Comment__author font-12">
                    {actor.user.name}
                  </span>
                </div>
                <div className="Comment__date font-12 ml-auto mr-4">
                  <span>{moment(commentData.createdAt).fromNow()}</span>
                  <img src="" alt="" />
                </div>
              </div>

              <div className="Comment__desc font-12 my-3">
                { commentDescription() }
              </div>
            </div>
            {
              commentData.type === "comment" && (
                <CommentText
                  text={commentData.comment}
                  className="mt-3 mb-1"
                  showAvatar={false}
                />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );

  //
  // return (
  //   <div className={`Comment ${className}`}>
  //     <div className="d-flex">
  //       <div className="flex-grow-1 pr-3">
  //         <div className="Comment__meta mb-2">
  //           <div className="d-flex align-items-center justify-content-between">
  //             <div className="d-flex align-items-center">
  //               <div className="Comment__status position-relative d-flex align-items-center justify-content-center">
  //                 <CommentsIcon
  //                   height="13"
  //                   width="13"
  //                   fill={
  //                     repliesCount ? colors.ZEEDAS_ORANGE : colors.ZEEDAS_WHITE
  //                   }
  //                 />
  //                 {repliesCount > 0 && (
  //                   <span className="Comment__reply-count">{repliesCount}</span>
  //                 )}
  //               </div>
  //               <AvatarSingle
  //                 item={{ user: commentData.user }}
  //                 className="CommentAuthorAvatar mx-2"
  //               />
  //               <span className="Comment__author font-12">
  //                 {commentData.user.name}
  //               </span>
  //             </div>
  //             <div className="Comment__date font-12">
  //               <span>{moment(commentData.createdAt).fromNow()}</span>
  //               <img src="" alt="" />
  //             </div>
  //           </div>
  //           <div className="Comment__desc font-12 my-2">
  //             <span className="font-weight-bold Comment__type">
  //               Commented on this
  //               {" "}
  //               {commentData.target.type}
  //             </span>
  //             {" "}
  //             <span className="Comment__object">
  //               {commentData.target.description}
  //             </span>
  //           </div>
  //         </div>
  //         <CommentText
  //           text={commentData.comment}
  //           className="my-2"
  //           showAvatar={false}
  //         />
  //         {/* <div className="d-flex justify-content-end Comment__reply font-12">
  //           <a>Reply</a>
  //         </div> */}
  //       </div>
  //       <div className="mt-2">
  //         <a
  //           className="Comment__toggle font-12"
  //           onClick={() => onClick(commentData)}
  //         >
  //           <span>Replies</span>
  //           <span className="zd-icon__down-arrow ml-1" />
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default SingleActivity;
