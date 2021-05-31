import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import ResolveExternalSvg from "./resolve-external-svg";

const projectIcon1 =
  "https://res.cloudinary.com/zeedas/image/upload/v1595015255/project-icons/project1_sprxhh.svg";
const projectIcon2 =
  "https://res.cloudinary.com/zeedas/image/upload/v1595015321/project-icons/project2_dd6emr.svg";
const projectIcon3 =
  "https://res.cloudinary.com/zeedas/image/upload/v1595015389/project-icons/project3_vgno8g.svg";
const projectIcon4 =
  "https://res.cloudinary.com/zeedas/image/upload/v1595010768/project-icons/project4_vangzp.svg";
const projectIcon5 =
  "https://res.cloudinary.com/zeedas/image/upload/v1595015536/project-icons/project5_vwoase.svg";
const projectIcon6 =
  "https://res.cloudinary.com/zeedas/image/upload/v1595015541/project-icons/project6_kxzxqn.svg";
const projectIcon7 =
  "https://res.cloudinary.com/zeedas/image/upload/v1595015543/project-icons/project7_ffphqg.svg";
const projectIcon8 =
  "https://res.cloudinary.com/zeedas/image/upload/v1595015576/project-icons/project8_daimj7.svg";
const projectIcon9 =
  "https://res.cloudinary.com/zeedas/image/upload/v1595015582/project-icons/project9_kmzyfi.svg";
const projectIcon10 =
  "https://res.cloudinary.com/zeedas/image/upload/v1595015594/project-icons/project10_fmdrqs.svg";
const projectIcon11 =
  "https://res.cloudinary.com/zeedas/image/upload/v1595015508/project-icons/project11_qlguxv.svg";
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
  data: [
    projectIcon1,
    projectIcon2,
    projectIcon3,
    projectIcon4,
    projectIcon5,
    projectIcon6,
    projectIcon7,
    projectIcon8,
    projectIcon9,
    projectIcon10,
    projectIcon11,
  ],
};

ProjectIconsList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
  ),
};

export default ProjectIconsList;
