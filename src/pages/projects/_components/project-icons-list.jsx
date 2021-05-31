import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import ResolveExternalSvg from "../../../zeedas-components/resolve-external-svg";
const ProjectIconsList = ({ data, onClick }) => {
  const [state, setState] = useState({
    activeId: "",
  });
  const toggleActiveClass = (id) => {
    setState({
      activeId: id,
    });
  };

  return (
    <Row className="container project-icons">
      {data.map((Item, index) => (
        <div
          className={`p-3 project-icon-wrap ${
            state.activeId === index ? "icon-active" : ""
          }`}
          onClick={() => {
            onClick(Item);
            toggleActiveClass(index);
          }}
          data-url={Item}
          key={index}
        >
          <ResolveExternalSvg url={Item} />
          {/* <Item /> */}
        </div>
      ))}
    </Row>
  );
};

ProjectIconsList.defaultProps = {
  data: [],
};

ProjectIconsList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
  ),
};

export default ProjectIconsList;
