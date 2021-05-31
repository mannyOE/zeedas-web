import React from "react";
import PropTypes from "prop-types";
import { AppUtils } from "../../../../utils/app-utils";

// import colors from "../../../../utils/colors";

const AccountAvatar = ({
  source,
  backgroundColor,
  name,
  dimension,
  width,
  height,
  borderRadius,
  fontSize,
}) => (
  <>
    {!source || source === "" ? (
      <div
        className="account-avatar"
        style={{
          backgroundColor: `${backgroundColor}`,
          width: `${height || dimension}px`,
          height: `${width || dimension}px`,
          borderRadius: `${borderRadius}px`,
          fontSize: `${fontSize}px`,
        }}
      >
        <span
          className="initials d-flex justify-content-center align-items-center"
          style={{ height: "inherit", width: "inherit" }}
        >
          {source !== "" ? "Z" : AppUtils.getInitials(name)}
        </span>
      </div>
    ) : (
      <img
        className="account-avatar"
        src={source}
        alt="profile"
        width="100"
        style={{
          backgroundColor: `${backgroundColor}`,
          width: `${dimension}px`,
          height: `${dimension}px`,
          borderRadius: `${borderRadius}px`,
          fontSize: `${fontSize}`,
        }}
      />
    )}
  </>
);

AccountAvatar.defaultProps = {
  // userDetails: {},
  dimension: 40,
  borderRadius: 20,
  fontSize: 12,
  source: "",
  width: "",
  height: "",
  backgroundColor: "",
  name: "",
};
AccountAvatar.propTypes = {
  // userDetails: PropTypes.objectOf(PropTypes.any),
  dimension: PropTypes.number,
  height: PropTypes.number || PropTypes.string,
  width: PropTypes.number || PropTypes.string,
  borderRadius: PropTypes.number,
  fontSize: PropTypes.number,
  source: PropTypes.string,
  backgroundColor: PropTypes.string,
  name: PropTypes.string,
};

export default AccountAvatar;
