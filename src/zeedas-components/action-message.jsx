import React from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import CardComponent from "./card";
import ButtonIconLeft from "./button-icon-left";
import DefaultButton from "./default-button";
import ButtonLoadingIcon from "../zeedas-assets/icons/icon-button-loader";
import ZeedasInput from "./input";

const ActionMessage = ({
  question,
  info,
  cancelText,
  icon,
  btnProceedColor,
  onClickProceed,
  proceedText,
  btnCancelColor,
  btnCancelBorder,
  onClickCancel,
  requesting,
  switchButtonOrder,
  proceedButtonStyle,
  cancelButtonStyle,
  placeholder,
  canConfirm,
  confirmationInput,
  onConfirmationInputChange,
}) => (
  <CardComponent borderRadius="15px">
    <div className="py-3 px-4">
      <Row>
        <Col sm={12}>
          <p className="clear-question">{question}</p>
          <p className="clear-info">{info}</p>
          { onConfirmationInputChange && (
            <ZeedasInput
              placeholder={placeholder}
              value={confirmationInput}
              onChange={onConfirmationInputChange}
              style={{
                width: "80%",
              }}
            />
          )}
        </Col>
      </Row>
      <Row className="mt-3">
        <div className={`ml-3 ${switchButtonOrder ? "order-1" : ""}`}>
          <DefaultButton
            color={btnCancelColor}
            border={btnCancelBorder}
            onClick={onClickCancel}
            style={{
              borderRadius: "10px",
              minWidth: "120px",
              ...cancelButtonStyle,
            }}
          >
            <span className="cancel-clear">
              {cancelText}
              {" "}
            </span>
          </DefaultButton>
        </div>
        <div className="ml-3">
          <ButtonIconLeft
            color={btnProceedColor}
            icon={!requesting ? icon : ""}
            text={requesting
              ? (
                <ButtonLoadingIcon
                  margin="0"
                  height="16px"
                  width="16px"
                />
              ) : proceedText}
            style={{
              fontSize: "14px",
              minWidth: "120px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ...proceedButtonStyle,
            }}
            onClick={onClickProceed}
            disabled={requesting || (typeof canConfirm === "boolean" && !canConfirm)}
          />
        </div>
      </Row>
    </div>
  </CardComponent>
);

export default ActionMessage;

ActionMessage.defaultProps = {
  question: "",
  info: "",
  cancelText: "Cancel",
  icon: <></>,
  btnProceedColor: "zd-blue",
  proceedText: "Proceed",
  btnCancelColor: "zd-light-blue",
  btnCancelBorder: "1px solid rgba(35, 179, 232, 1)",
  onClickProceed: () => {},
  onClickCancel: () => {},
  requesting: false,
  switchButtonOrder: false,
};
ActionMessage.propTypes = {
  question: PropTypes.string,
  info: PropTypes.string,
  cancelText: PropTypes.string,
  icon: PropTypes.element,
  btnProceedColor: PropTypes.string,
  proceedText: PropTypes.string,
  btnCancelColor: PropTypes.string,
  btnCancelBorder: PropTypes.string,
  onClickProceed: PropTypes.func,
  onClickCancel: PropTypes.func,
  requesting: PropTypes.bool,
  switchButtonOrder: PropTypes.bool,
};
