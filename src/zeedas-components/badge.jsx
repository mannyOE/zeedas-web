import React from "react";
import { Badge } from "reactstrap";
import PropTypes from "prop-types";
import colors from "../utils/colors";

const ZeedasBadge = ({ children, color, backgroundColor, style }) => (
  <Badge style={{ color, backgroundColor, ...style }} className="zeedas-badge font-12 font-medium d-inline-flex align-items-center">
    {children}
  </Badge>
);

ZeedasBadge.defaultProps = {
  color: colors.ZEEDAS_WHITE,
  backgroundColor: colors.ZEEDAS_BLUE,
  style: {},
};

ZeedasBadge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

export default ZeedasBadge;
