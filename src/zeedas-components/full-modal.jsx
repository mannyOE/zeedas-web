import React from "react";
import PropTypes from "prop-types";
import CardComponent from "./card";
/* TODO */
// Stop pagescrollbar from scrolling

const ZeedasFullModal = ({
  open,
  onClose,
  borderRadius,
  width,
  minHeight,
  children,
  hideCloseButton,
  removeDefaultPadding,
}) => {
  // This controls if the modal is shown or not
  const modalVisibility = open ? "showFullModal" : "hideFullModal";

  return (
    <div
      className={`modalBackdrop ${modalVisibility}`}
      style={{ justifyContent: "flex-end", zIndex: "9999" }}
    >
      {
        !hideCloseButton
      && (
      <p
        className="modalClose "
        onClick={onClose}
        style={{ height: "50px", marginRight: "20px", paddingTop: "30px" }}
      >
        <span className="ti-close" />
        {" "}
        Close
      </p>
      )
      }

      <div
        className="modalContent"
        style={{
          width: width || "33.33%;",
          marginTop: "0",
          padding: "0",
          overflowY: "scroll",
          // backgroundColor: "#fff",
        }}
      >
        <CardComponent
          marginBottom={0}
          minHeight={minHeight}
          borderRadius={borderRadius}
          className={removeDefaultPadding && "p-0"}
        >
          <div
            style={{
              padding: !removeDefaultPadding ? "30px 80px" : "",
              height: "max-content",
            }}
          >
            {children}
          </div>
        </CardComponent>
      </div>
    </div>
  );
};

ZeedasFullModal.defaultProps = {
  borderRadius: "0",
  minHeight: "100vh",
  hideCloseButton: false,
};

ZeedasFullModal.propTypes = {
  // title: PropTypes.string,
  // description: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  width: PropTypes.string,
  hideCloseButton: PropTypes.bool,
  removeDefaultPadding: PropTypes.bool,
};

export default ZeedasFullModal;
