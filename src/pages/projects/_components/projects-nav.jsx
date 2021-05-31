import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import { FaAngleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { filterItems, sortItems } from "../../../state/redux/project/actions";
import { PROJECT_SORT_OPTIONS, PROJECT_FILTER_OPTIONS } from "../../../utils/constants";

import ButtonIconArrowBorder from "../../../zeedas-components/button-icon-arrow-border";
import ButtonIconLeft from "../../../zeedas-components/button-icon-left";
import ButtonDropdownSort from "../../../zeedas-components/button-dropdown-sort";
import IconPlusSquare from "../../../zeedas-assets/icons/icon-plus-square";
import IconFilter from "../../../zeedas-assets/icons/icon-filter";

const ProjectsNav = ({ openCreateProject, adminRole }) => {
  //
  const dispatch = useDispatch();

  const handleSortFilterSelect = (sortOption, type) => {
    if (type === "sort") {
      dispatch(sortItems(sortOption.value));
    } else if (type === "filter") {
      dispatch(filterItems(sortOption.value));
    }
  };

  return (
    <div className="projects-nav-container">
      <Row>
        <Col md={4} style={{ marginLeft: "15px" }}>
          <Row className="sort-buttons">
            {/* <ButtonIconLeft
            color="zd-white"
            icon={<IconFilter />}
            text="Filter"
          /> */}
            <ButtonDropdownSort
              options={PROJECT_FILTER_OPTIONS}
              onSelect={handleSortFilterSelect}
              icon={<IconFilter />}
              color="zd-white"
              type="filter"
              text="Filter"
            />
            <ButtonDropdownSort
              options={PROJECT_SORT_OPTIONS}
              onSelect={handleSortFilterSelect}
              color="zd-white"
              type="sort"
              text="Sort by"
            />
          </Row>
        </Col>
        <Col md={6}>
          {adminRole && (
            <div className="float-lg-right ">
              <ButtonIconArrowBorder
                onClick={openCreateProject}
                color="zd-blue"
                icon={<IconPlusSquare />}
                arrow={<FaAngleRight />}
                text="New Project"
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProjectsNav;
ProjectsNav.defaultProps = {
  openCreateProject: () => {
    // your logic here...
  },
  adminRole: false,
};
ProjectsNav.propTypes = {
  openCreateProject: PropTypes.func,
  adminRole: PropTypes.bool,
};
