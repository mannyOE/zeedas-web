import React from "react";
import PropTypes from "prop-types";
import person from "../zeedas-assets/images/profile/person.svg";
import IconPlus from "../zeedas-assets/icons/icon-plus";
import ButtonIconLeft from "./button-icon-left";

const EmptyRecordMessage = ({
  message,
  btnText,
  showActionButton,
  width,
  minHeight,
  fontSize,
  callAction,
  textWidth,
  display,
  className,
}) => (
  <div className={`empty-record ${className}`} style={{ minHeight }}>
    <img src={person} alt="user" width={width} style={{ display }} />
    <p className="mx-auto justify-content-center" style={{ fontSize, width: textWidth }}>{message}</p>
    {showActionButton && (
      <ButtonIconLeft
        onClick={callAction}
        color="zd-blue"
        text={btnText}
        icon={<IconPlus />}
      />
    )}
  </div>
);

export default EmptyRecordMessage;

EmptyRecordMessage.defaultProps = {
  message: "No Record",
  btnText: "Create Record",
  showActionButton: false,
  width: 100,
  fontSize: "24px",
  display: "inlineBlock",
  textWidth: "",
  className: "",
  callAction: () => {
    // your logic here...
  },
};

EmptyRecordMessage.propTypes = {
  message: PropTypes.string,
  btnText: PropTypes.string,
  fontSize: PropTypes.string,
  showActionButton: PropTypes.bool,
  width: PropTypes.number,
  callAction: PropTypes.func,
  textWidth: PropTypes.string,
};
