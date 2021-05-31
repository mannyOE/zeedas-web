import React, { useState, useEffect } from "react";
//import PropTypes from "prop-types";

const ResolveExternalSvg = ({ url }) => {
  const [state, setState] = useState("");
  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => setState(text));
  }, []);
  return (
    <span
      className="project-icon"
      dangerouslySetInnerHTML={{ __html: state }}
    ></span>
  );
};

export default ResolveExternalSvg;
