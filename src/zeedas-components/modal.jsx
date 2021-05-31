import React from "react";
import PropTypes from "prop-types";

/* TODO */
// Stop pagescrollbar from scrolling

const ZeedasModal = (props) => {
  // This controls if the modal is shown or not
  const modalVisibility = props.open ? "showModal" : "hideModal";

  return (
    <div
      className={`modalBackdrop ${modalVisibility}`}
      style={{ alignItems: props.align }}
    >
      <div
        className="modalContent"
        style={{ maxWidth: props.maxWidth ? props.maxWidth : "500px" }}
      >
        <p className="modalClose" onClick={props.onClose}>
          <span className="ti-close mr-2" />
          {" "}
          Close
        </p>
        <div className="modalHeader mb-4">
          <h1 className="modalTitle">{props.title}</h1>
          <p className="modalDescription">{props.description}</p>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

ZeedasModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  maxWidth: PropTypes.string,
  align: PropTypes.string,
};

export default ZeedasModal;
