import React from 'react';
import {
  Row, Col,
} from 'reactstrap';
import zeedaslogo from '../../zeedas-assets/images/logos/zeedas-sidebar-logo.svg';
import Bars from '../../zeedas-assets/images/sidebar/bars';
import MiniSlantBars from '../../zeedas-assets/images/sidebar/mini-slant-bars.svg';

const MiniLeftSection = (
) => (

  <>
    {/* Top Bar here */}
    <Row>
      <Col md="12">
        <img
          src={zeedaslogo}
          alt="homepage"
        />
      </Col>
    </Row>

    <Row className="bars">
      <Col md="12">
        <Bars />
      </Col>
    </Row>


    <img src={MiniSlantBars} alt="background" className="mini-slant-bars" />

  </>
);

export default MiniLeftSection;
