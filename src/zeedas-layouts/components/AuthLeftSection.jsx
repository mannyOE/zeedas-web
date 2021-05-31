import React from "react";
import {
  Row, Col, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from "reactstrap";
import zeedaslogo from "../../zeedas-assets/images/logos/zeedas-sidebar-logo.svg";
import SponsorsLogo from "../../zeedas-assets/images/logos/sponsors-logo";
import SlantBars from "../../zeedas-assets/images/sidebar/slant-bars.svg";
import FlagOfNigeria from "../../zeedas-assets/images/flags/flag-ng.svg";
import Slider from "../../zeedas-components/slider";
import IconDropDown from "../../zeedas-assets/icons/icon-drop-down";

const AuthLeftSection = (
) => (

  <>
    {/* Top Bar here */}
    <Row>
      <Col md="6">
        <img
          src={zeedaslogo}
          alt="homepage"
        />
      </Col>
      <Col md="6">
        <UncontrolledDropdown className="float-right">
          <DropdownToggle nav className="p-0 text-white">
            {/* <i className="flag-icon flag-icon-ng img-circle" /> */}
            <img src={FlagOfNigeria} alt="flag-nigeria" className="mr-2" />
            <span style={{ fontWeight: 500, marginRight: "8px" }}>EN - English</span>

            <IconDropDown />
          </DropdownToggle>
          <DropdownMenu right className="mt-4">
            <DropdownItem>
              {/* <i className="flag-icon flag-icon-ng" /> */}
              <img className="mr-2" src={FlagOfNigeria} alt="flag-nigeria" />
              EN - English
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Col>
    </Row>

    {/* Carousel here */}
    <Row>
      <Col>
        <Slider />
      </Col>
    </Row>

    {/* Footer here */}
    <Row className="footer">
      <SponsorsLogo />
    </Row>

    <img src={SlantBars} alt="background" className="slant-bars" />
  </>
);

export default AuthLeftSection;
