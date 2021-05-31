import React from "react";

const CommentAuthorAvatar = ({ avatar, avatarColor, className }) => {
  return (
    <div>
      {/* <img className="Comment__author-avatar" src={avatar} alt="" className="mr-1" /> */}
      <span className={`CommentAuthorAvatar mx-2 ${className}`}></span>
    </div>
  );
};

export default CommentAuthorAvatar;
