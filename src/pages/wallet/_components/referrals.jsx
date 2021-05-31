import React from 'react';
import { Row, Col } from "reactstrap";
import { FaAngleRight } from "react-icons/fa";
import PropTypes from "prop-types";
import IconInfoSolid from "../../../zeedas-assets/icons/icon-info-solid";
// import { CaretCard } from "../../../zeedas-components/caret-card";
import ReferCard from "./refer-card";

const Referrals = ({
  openReferModal, showInfo, showReferralCard, link,
}) => (
  <div className=" referral-container mt-2 mb-4">
    <h6 className="side-title referal-title">Referrals</h6>
    <Row>
      <Col lg={9} xs={10}>
        <p className="referral-info">
          Click on the button below to enter email address of who you are referring

        </p>
      </Col>
      <Col lg={3} xs={2}>
        <div className="caret-card-wrapper float-sm-right">
          <div
            className="icon-info-referral"
            onClick={() => showInfo()}
          >
            <IconInfoSolid />
          </div>
          {/* <CaretCard */}
          {/*  text={`It is a long established fact that a */}
          {/*  reader will be distracted by the readable content */}
          {/*   of a page when looking at its layout. */}
          {/*  The point of using Lorem Ipsum is that it`} */}
          {/*  displayCaretCard={showReferralCard} */}
          {/* /> */}
          <ReferCard
            link={link}
            displayReferralPrompt={showReferralCard}
          />
        </div>
      </Col>
      <Col lg={12} xs={12}>
        <div onClick={openReferModal} className="refer">
          <p className="refer-friends float-left">Refer your friends</p>
          <p className="ml-4 float-right">
            <FaAngleRight className="ml-4 refer-friends" />
          </p>
        </div>

      </Col>
    </Row>
    <hr className="divider" />

  </div>
);

export default Referrals;

Referrals.defaultProps = {
  openReferModal: () => {
    // your logic here...
  },
  showInfo: false,
  showReferralCard: false,
  link: "",
};

Referrals.propTypes = {
  openReferModal: PropTypes.func,
  showInfo: PropTypes.bool,
  showReferralCard: PropTypes.bool,
  link: PropTypes.string,
};
