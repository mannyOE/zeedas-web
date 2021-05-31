import React from "react";
import { Row, Col } from "reactstrap";
import PropTypes, { string } from "prop-types";
import IconBillingNotice from "../../../zeedas-assets/icons/icon-billing-notice";
import IconBillingAmount from "../../../zeedas-assets/icons/icon-billing-amount";

const BillingNotice = ({ billingDate, billingAmount }) => (
  <div className="mt-4 mb-4 billing">
    <h6 className="side-title">Billing Notice</h6>
    <Row>
      <Col lg={{ size: 11, offset: 1 }} className="bill-container">
        <Row className="billing-notice-container">
          <Col lg={3} md={3} sm={3} className="mt-1">
            <IconBillingNotice />
          </Col>
          <Col
            className="d-flex flex-column justify-content-center"
            lg={9}
            md={9}
            sm={9}
          >
            <div>
              <p className="billing-subheading mt-0 mb-2">Next Billing Circle</p>
              <p className="billing-details m-0">{billingDate}</p>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col lg={{ size: 11, offset: 1 }} className="bill-container mt-2">
        <Row className="p-2">
          <Col lg={3} md={3} sm={3} className="mt-1">
            <IconBillingAmount />
          </Col>
          <Col lg={9} md={9} sm={9}>
            <p className="billing-subheading">Billing Amount</p>
            <p className="billing-details">${billingAmount}</p>
          </Col>
        </Row>
      </Col>
    </Row>
    <hr className="divider" />
  </div>
);

export default BillingNotice;

BillingNotice.defaultProps = {
  billingDate: string,
  billingAmount: 0.0,
};

BillingNotice.propTypes = {
  billingDate: PropTypes.string,
  billingAmount: PropTypes.number,
};
