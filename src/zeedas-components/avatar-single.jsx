import React from "react";
import PropTypes from "prop-types";

const AvatarSingle = ({ item, className }) => (
  <>
    {item.user.avatar === "" ? (
      <div
        className={`img ${className}`}
        style={{ background: item.user.avatarColor, color: "#fff" }}
      >
        <span
          className="d-flex justify-content-center align-items-center"
          style={{ height: "inherit", width: "inherit" }}
        >
          {item.user.name.substring(0, 2)}
        </span>
      </div>
    ) : (
      <>
        <img className={`img ${className}`} src={item.user.avatar} alt="" />
      </>
    )}
  </>
);
export default AvatarSingle;

AvatarSingle.defaultProps = {
  item: {},
};
AvatarSingle.propTypes = {
  item: PropTypes.object,
};
