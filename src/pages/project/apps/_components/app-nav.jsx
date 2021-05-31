import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import ButtonIconArrowBorder from "../../../../zeedas-components/button-icon-arrow-border";
import ButtonIconLeft from "../../../../zeedas-components/button-icon-left";
import ButtonDropdownSort from "../../../../zeedas-components/button-dropdown-sort";
import IconPlusSquare from "../../../../zeedas-assets/icons/icon-plus-square";
import { FaAngleRight } from "react-icons/fa";
import IconFilter from "../../../../zeedas-assets/icons/icon-filter";

const AppNav = ({ openCreateApp }) => (
  <div className="projects-nav-container">
    <Row>
      <Col md={4} style={{ marginLeft: "15px" }}>
        <Row className="sort-buttons">
          <ButtonIconLeft
            color="zd-white"
            icon={<IconFilter />}
            text="Filter"
          />
          <ButtonDropdownSort color="zd-white" text="Sort by" />
        </Row>
      </Col>
      <Col md={6}>
        <div className="float-lg-right ">
          <ButtonIconArrowBorder
            onClick={openCreateApp}
            color="zd-blue"
            icon={<IconPlusSquare />}
            arrow={<FaAngleRight />}
            text="New App"
          />
        </div>
      </Col>
    </Row>
  </div>
);

export default AppNav;
AppNav.defaultProps = {
  openCreateApp: () => {
    // your logic here...
  },
};
AppNav.propTypes = {
  openCreateApp: PropTypes.func,
};
