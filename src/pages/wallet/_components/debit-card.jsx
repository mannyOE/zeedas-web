import React from 'react';
import PropTypes from "prop-types";
import { walletHelpers } from "../_helper";

const DebitCard = ({
  expiry, number, cvv, brand,
}) => (
  <div className="credit-card">
    {/* <div className="credit-card__logo"><img src={Visa}/></div> */}
    <div className="credit-card__logo">
      {walletHelpers.creditCard(brand, "defaultHeight")}
    </div>

    <div className="credit-card__number">{number}</div>

    <div className="credit-card__info">
      <div className="credit-card__info_expiry">
        <div className="credit-card__info_label">EXPIRY</div>
        <div>{expiry}</div>
      </div>
      <div className="credit-card__info_expiry">
        <div className="credit-card__info_label">CVV</div>
        <div>{cvv}</div>
      </div>
    </div>
  </div>
);

export default DebitCard;

DebitCard.defaultProps = {
  expiry: "",
  number: "**** **** **** ****",
  cvv: "***",
  brand: "",
};

DebitCard.propTypes = {
  expiry: PropTypes.string,
  number: PropTypes.string,
  cvv: PropTypes.string,
  brand: PropTypes.string,
};
