import React from 'react';
import { Col, Row } from 'reactstrap';
import { FaAngleRight } from "react-icons/fa";
import PropTypes from "prop-types";
import { PaystackButton } from "react-paystack";
// import { CardElement } from '@stripe/react-stripe-js';
import ButtonIconArrow from "../../../zeedas-components/button-icon-arrow";
import IconAddCard from "../../../zeedas-assets/icons/icon-add-card";
import IconFundWallet from "../../../zeedas-assets/icons/icon-fund-wallet";
import IconDollar from "../../../zeedas-assets/icons/icon-dollar";
// import DefaultButton from "../../../zeedas-components/default-button";
// import ButtonLoadingIcon from "../../../zeedas-assets/icons/icon-button-loader";

const cardElementOptions = {
  style: {
    base: {
      color: "#03293D",
      "::placeholder": {
        color: "#03293D",
      },
      invalid: {
        color: "#f15832",
        iconColor: "#f15832",
      },
    },
  },
};

const Balance = ({
  balance, subscriptionPrice, lastFunded, fundWallet, addCard,
  paystackProps, paymentChannel,
}) => (
  <div className="balance-container">
    <Row>
      <Col lg={8} md={8} sm={8}>
        <p className="wallet-balance">Wallet Balance</p>
        <p className="balance">
          <span className="currency-sign">
            <IconDollar
              height={40}
            />
          </span>
          {balance}
        </p>
        <div>
          <p className=" subscription-text">
            Subscription Price
            <span className="subscription-price ml-2">
              $
              {subscriptionPrice}
            </span>
          </p>
          <p className=" last-funded  ml-4">
            Last Funded
            <span className="last-funded-time ml-2">{lastFunded}</span>
          </p>
        </div>
      </Col>
      <Col lg={4} md={4} sm={4}>
        <div className="float-lg-right  mt-2">
          <div className="btn-fund-wallet ">
            <ButtonIconArrow
              color="zd-blue"
              icon={<IconFundWallet />}
              arrow={<FaAngleRight />}
              text="Fund Wallet"
              onClick={fundWallet}
            />
          </div>
          {paymentChannel === "paystack"
        && (
          <div className="btn-add-card">
            <ButtonIconArrow
              color="zd-blue-inverse"
              icon={<IconAddCard />}
              arrow={<FaAngleRight />}
              text={(
                <PaystackButton
                  className="paystack-button"
                  {...paystackProps}
                />
)}
            />
          </div>
        )}
          {paymentChannel === "stripe"
        && (
          <div className="btn-add-card">
            <ButtonIconArrow
              color="zd-blue-inverse"
              icon={<IconAddCard />}
              arrow={<FaAngleRight />}
              text="Add Card"
              onClick={addCard}
            />
          </div>
        )}

        </div>
      </Col>
    </Row>
  </div>
);

export default Balance;

Balance.defaultProps = {
  balance: "0",
  subscriptionPrice: 0,
  lastFunded: "",
  fundWallet: () => "hello",
  addCard: () => {
    // your logic here...
  },
  paystackProps: {},
  paymentChannel: "",
};

Balance.propTypes = {
  paystackProps: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.array],
  )),
  paymentChannel: PropTypes.string,
  balance: PropTypes.string,
  subscriptionPrice: PropTypes.number,
  lastFunded: PropTypes.string,
  fundWallet: PropTypes.func,
  addCard: PropTypes.func,
};
