import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import IconSendComment from "zeedas-assets/icons/icon-send-comment";
import colors from "utils/colors";
import { comment } from "state/redux/comment/actions";

const SendComment = ({ task, activeComment }) => {
  const newCommentRef = useRef(null);
  const [newComment, setNewComment] = useState("");
  const [sendingComment, setSendingComment] = useState(false);
  const dispatch = useDispatch();
  const { comments, commentTarget } = useSelector((state) => state.comment);
  //   useEffect(() => {
  //     // newCommentRef.current.focus();
  //   });

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const sendComment = (event) => {
    event.preventDefault();
    const payload = {
      app: task.app,
      module: task._id,
      comment: newCommentRef.current.value,
      target: {
        id: commentTarget.id,
        type: commentTarget.type,
        description: commentTarget.name,
      },
    };
    setSendingComment(true);
    dispatch(comment.saveComment(payload))
      .then((response) => {
        setNewComment("");
        // debugger
        // newCommentRef.current.value = ""
      })
      .finally(() => setSendingComment(false));
  };

  const replyComment = (event) => {
    event.preventDefault();
    const payload = {
      commentId: activeComment._id,
      comment: newComment,
    };
    setSendingComment(true);
    dispatch(comment.replyComment(payload))
      .then(() => {
        setNewComment("");
      })
      .finally(() => {
        setSendingComment(false);
      });
  };

  return (
    <form
      className="SendComment d-flex align-items-center justify-content-between px-4 py-2"
      onSubmit={comments.length ? replyComment : sendComment}
    >
      <input
        ref={newCommentRef}
        type="text"
        name=""
        id=""
        onInput={handleInputChange}
        value={newComment}
        placeholder="Enter comment here"
        className="SendComment__input py-2 px-0"
      />
      <button className="SendComment__button d-inline-flex align-items-center justify-content-center" disabled={!newComment}>
        <IconSendComment fill={colors.ZEEDAS_WHITE} />
      </button>
    </form>
  );
};

export default SendComment;
