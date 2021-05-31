import React from "react";
import { useSelector } from "react-redux";
import CommentsIcon from "zeedas-assets/icons/icon-comments";
import colors from "utils/colors";
import AvatarSingle from "zeedas-components/avatar-single";
import moment from "moment";
import CommentText from "./comment-text";

const SingleComment = ({ className, commentData, onClick }) => {
  // const repliesCount = commentData.replies.length;
  const users = useSelector((state) => state.users.teamsList);
  const allUsers = [...users.coreTeam, ...users.contractTeam];

  let actor;

  if (commentData.type === "activity") {
    actor = allUsers.filter((singleUser) => singleUser.user._id === commentData.actor)[0];

    return (
      <div className={`Comment ${className} w-100`}>
        <div className="d-flex">
          <div className="d-flex flex-grow-1 pr-3">
            <div className="Comment__meta mb-2 ml-2 w-100">
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
                <span className="font-weight-bold Comment__type mr-1">
                  {commentData.action}
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  actor = allUsers.filter((singleUser) => singleUser.user._id === commentData.user)[0];

  return (
    <div className={`Comment ${className} w-100`}>
      <div className="d-flex">
        <div className="d-flex flex-grow-1 pr-3">
          <div className="Comment__meta mb-2 ml-2 w-100">
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
                <span className="font-weight-bold Comment__type mr-1">
                  Commented on this
                  {" "}
                  {commentData.target.type}
                </span>
                {" "}
                <span className="Comment__object">
                  {commentData.target.description}
                </span>
              </div>
            </div>
            <CommentText
              text={commentData.comment}
              className="my-3"
              showAvatar={false}
            />
          </div>
          {/* <div className="d-flex justify-content-end Comment__reply font-12">
            <a>Reply</a>
          </div> */}
        </div>

{/*        <div className="mt-2">
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

export default SingleComment;
