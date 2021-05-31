import React from "react";
import PropTypes from "prop-types";
import AvatarSingle from "./avatar-single";
const AvatarStacked = ({ items }) => {
  return (
    <div className="avatar-wrap">
      {items.map((Item, index) => (
        <AvatarSingle key={index} item={Item} />
      ))}
    </div>
  );
};
export default AvatarStacked;

AvatarStacked.defaultProps = {
  items: [],
};
AvatarStacked.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
  ),
};
