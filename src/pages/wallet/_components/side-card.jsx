import React from 'react';
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import { FaAngleRight } from "react-icons/fa";
import CardComponent from "../../../zeedas-components/card";
import Referrals from "./referrals";
import BillingNotice from "./billing-notice";
import DebitCard from "./debit-card";
import SubscriptionSetting from "./subscription-setting";

const SideCard = ({
  openReferModal, billingDate, billingAmount,
  showReferralCard, showInfo, showSubscriptionSettings,
  seeAllCards, cardName, cardNumber, cardExpiryDate,
  cvv, brand, link,
}) => (
  <div>
    <CardComponent
      border="1px solid rgba(16, 16, 16, 0.1)"

    >
      <>
        {showSubscriptionSettings
        && <SubscriptionSetting />}
        {!showSubscriptionSettings
      && (
      <Referrals
        openReferModal={openReferModal}
        showReferralCard={showReferralCard}
        showInfo={showInfo}
        link={link}
      />
      )}
        <BillingNotice
          billingDate={billingDate}
          billingAmount={billingAmount}
        />
        <Row className=" cards-container">
          <Col lg={6} sm={6} xs={6}>
            <h4 className="side-title float-left">Saved Cards</h4>
          </Col>
          <Col lg={6} sm={6} xs={6}>
            <p className="float-right see-all" onClick={seeAllCards}>
              See all
              <span className="angle-right">
                <FaAngleRight className=" ml-2" />
              </span>
            </p>
          </Col>
          <Col lg={12}>
            <DebitCard
              name={cardName}
              cvv={cvv}
              number={cardNumber}
              expiry={cardExpiryDate}
              brand={brand}
            />
          </Col>
        </Row>
      </>
    </CardComponent>
  </div>
);

export default SideCard;

SideCard.defaultProps = {
  openReferModal: () => {
    // your logic here...
  },
  billingDate: "",
  billingAmount: 0.00,
  showInfo: () => {},
  showReferralCard: false,
  showSubscriptionSettings: false,
  seeAllCards: () => {},
  cardName: "",
  cardNumber: "**** **** **** ****",
  cardExpiryDate: "",
  cvv: "xxx",
  brand: "",
  link: "",
};

SideCard.propTypes = {
  openReferModal: PropTypes.func,
  billingDate: PropTypes.string,
  billingAmount: PropTypes.number,
  showInfo: PropTypes.func,
  showReferralCard: PropTypes.bool,
  showSubscriptionSettings: PropTypes.bool,
  seeAllCards: PropTypes.func,
  cardName: PropTypes.string,
  cardNumber: PropTypes.string,
  cardExpiryDate: PropTypes.string,
  cvv: PropTypes.string,
  brand: PropTypes.string,
  link: PropTypes.string,
};
