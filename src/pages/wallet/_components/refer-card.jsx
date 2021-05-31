import React from 'react';
import { Row } from "reactstrap";
import PropTypes from "prop-types";
import CardComponent from "../../../zeedas-components/card";
import ReferImg from "../../../zeedas-assets/images/profile/refer-img.svg";

const ReferCard = ({ link, displayReferralPrompt }) => (
  <div className="refer-card-container" style={{ display: displayReferralPrompt ? "block" : "none" }}>
    <CardComponent>
      <div className="refer-card-contents">
        <Row className=" justify-content-center">
          <img src={ReferImg} alt="zeedas-referral" />
        </Row>
        <Row className="text-center justify-content-center">
          <p className="gift">
            Gift a friend
            <span className="referral-gift"> $50</span>
            {' '}
            and get
            <span className="referral-reward"> $50</span>
            {' '}
            when they join us
          </p>
          <p className="mt-2 refer-friends">Refer your friends</p>
        </Row>
        <Row className="text-center justify-content-center">
          <p className="refer-divider"><span>OR</span></p>
          <p className="refer-share mt-2">Share your link</p>
          <span className="refer-link mt-2">{link}</span>
          {/* <span className="refer-link mt-2">https://zeedas.com/ref/1axx</span> */}
        </Row>
      </div>
    </CardComponent>
  </div>
);

export default ReferCard;

ReferCard.defaultProps = {
  link: "",
  displayReferralPrompt: false,
};

ReferCard.propTypes = {
  link: PropTypes.string,
  displayReferralPrompt: PropTypes.bool,
};
