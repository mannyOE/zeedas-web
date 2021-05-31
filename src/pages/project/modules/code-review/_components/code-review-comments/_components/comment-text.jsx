import React from "react";
import AvatarSingle from "zeedas-components/avatar-single";
import { AppUtils } from "utils/app-utils";

const CommentText = (props) => {
  const {
    text,
    className,
    showAvatar,
    user,
  } = props;

  let repliedByMe = false;
  if (showAvatar) repliedByMe = AppUtils.getCurrentUserId() === user._id;

  const formatCommentText = (str) => {
    const txt = str.replace(/@\S*/g, "<span class=\"Comment__tag\">$&</span>");
    return <div dangerouslySetInnerHTML={{ __html: txt }} />;
  };
  return (
    <div
      className={`${className} CommentText px-3 py-2 font-12 d-flex align-items-center ${
        repliedByMe ? "blue-bg" : ""
      }`}
    >
      {showAvatar && (
        <AvatarSingle item={{ user }} className="CommentAuthorAvatar mr-2" />
      )}
      <span>{formatCommentText(text)}</span>
    </div>
  );
};

export default CommentText;
