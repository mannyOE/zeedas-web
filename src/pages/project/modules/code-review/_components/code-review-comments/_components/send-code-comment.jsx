import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import IconSendComment from "zeedas-assets/icons/icon-send-comment";
import colors from "utils/colors";
import { comment as commentActions } from "state/redux/comment/actions";
import { COMMENT_LEVELS } from "../../../../../../../state/redux/comment/types";

const SendCodeComment = (props) => {
  const {
    onSendComment,
    onReplyComment,
    hideSendButton = false,
    onCancel = () => ({}),
  } = props;

  const newCommentRef = useRef(null);
  const [newComment, setNewComment] = useState("");
  const [sendingComment, setSendingComment] = useState(false);
  const { comments, codeFragment } = useSelector((state) => state.comment);

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const sendComment = (event) => {
    event.preventDefault();
    setSendingComment(true);

    if (codeFragment.commentLevel === COMMENT_LEVELS.top) {
      onSendComment(newComment)
        .then(() => setNewComment(""))
        .finally(() => setSendingComment(false));
    } else if (codeFragment.commentLevel === COMMENT_LEVELS.reply) {
      onReplyComment(newComment)
        .then(() => setNewComment(""))
        .finally(() => setSendingComment(false));
    }
  };

  useEffect(() => {
    newCommentRef.current.focus();
  }, []);

  return (
    <form
      className={`SendComment d-flex ${hideSendButton ? "flex-column" : ""} align-items-center justify-content-between px-4 py-2`}
      onSubmit={sendComment}
    >
      <input
        ref={newCommentRef}
        type="text"
        name=""
        id=""
        onInput={handleInputChange}
        disabled={sendingComment}
        value={newComment}
        placeholder={`${hideSendButton ? "Reply" : "Enter comment here"}`}
        className={`SendComment__input py-2 px-0 ${hideSendButton ? "w-100" : ""}`}
      />

      { !hideSendButton && (
        <button
          className={`SendComment__button ${sendingComment ? "sending-comment" : ""}`}
          disabled={!newComment || sendingComment}
          type="submit"
        >
          <IconSendComment fill={colors.ZEEDAS_WHITE} />
        </button>
      )}

      { hideSendButton && (
        <div className="d-flex ml-0 px-0 py-2 pt-3 w-100">
          <button
            className={`CodeReview__button SendComment__approve-button approve mr-3 ${sendingComment ? "sending-comment" : ""}`}
            disabled={!newComment || sendingComment}
            type="submit"
          >
            Reply
          </button>
          <button
            className="CodeReview__button cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default SendCodeComment;
