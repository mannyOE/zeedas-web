import React from "react";
import { Card, CardBody } from "reactstrap";
import PropTypes from "prop-types";

const CardComponent = ({
  children,
  color,
  bgColor,
  height,
  border,
  borderRadius,
  minHeight,
  marginBottom,
  style,
  className,
}) => (
  <div>
    <Card
      className={`card-component ${className}`}
      style={{
        color,
        backgroundColor: bgColor,
        height,
        border,
        borderRadius,
        minHeight,
        marginBottom,
        ...style,
      }}
    >
      <CardBody>{children}</CardBody>
    </Card>
  </div>
);

export default CardComponent;

CardComponent.defaultProps = {
  children: <></>,
  color: "#000",
  bgColor: "#fff",
  height: "max-content",
  border: "none",
  borderRadius: "5px",
  minHeight: "0",
  marginBottom: "30px",
  style: {},
  className: "",
};

CardComponent.propTypes = {
  children: PropTypes.element,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  minHeight: PropTypes.string,
  marginBottom: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};
