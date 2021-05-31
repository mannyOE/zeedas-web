import React from "react";
import PropTypes from "prop-types";
import zeedaslogo from "../zeedas-assets/images/logos/icon_zeedas_page_loader.svg";

const PageLoader = ({ message }) => (
  <div className="page-loader d-flex justify-content-center align-items-center">
    <div className="text-center">
      <img src={zeedaslogo} height="60" alt="zeedas" />
      <p className="loader-text">{`${message}...`}</p>
    </div>
  </div>
);

PageLoader.propTypes = {
  message: PropTypes.string,
};

PageLoader.defaultProps = {
  message: "loading",
};

export default PageLoader;
