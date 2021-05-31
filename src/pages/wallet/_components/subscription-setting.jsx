import React from 'react';
import { Row, Col } from "reactstrap";
import { FaAngleRight } from "react-icons/fa";
import IconSubscriptionSettings from "../../../zeedas-assets/icons/icon-subscription-settings";

const SubscriptionSetting = () => (
  <div className=" referral-container mt-2 mb-4">
    <h6 className="side-title referal-title">Subscription Settings</h6>
    <Row className="mt-4">
      <Col lg={2} sm={2} xs={2}>
        <IconSubscriptionSettings />
      </Col>
      <Col lg={8} sm={10} xs={10}>
        <div className="upgrade-subscription">
          <p>upgrade your plan to transact more funds</p>
          <p>
            Upgrade Now
            <span className="angle-right"><FaAngleRight className=" ml-2 size={20} " /></span>
          </p>
        </div>

      </Col>
    </Row>
    <hr className="divider" />

  </div>
);

export default SubscriptionSetting;
