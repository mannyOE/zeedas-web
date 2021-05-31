import React from 'react';
import { FaAngleRight } from "react-icons/fa";
import PropTypes from "prop-types";
import { PaystackButton } from "react-paystack";
import { CardElement } from '@stripe/react-stripe-js';
import IconEmptyWallet from "../../../zeedas-assets/icons/icon-empty-wallet";
import CardComponent from "../../../zeedas-components/card";
import Logo from "../../../zeedas-assets/icons/colored-logo.svg";
import DefaultButton from "../../../zeedas-components/default-button";
import ButtonLoadingIcon from "../../../zeedas-assets/icons/icon-button-loader";

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
const AddCard = ({
  paystackProps, paymentChannel,
  addCardStripe, requesting,
  stripeError, stripeErrorMsg, cardLength
}) => (
  <CardComponent>
    <div className="px-4 text-center">
      <div className="mt-2">
        <IconEmptyWallet
          fill="#EB0E43"
        />
      </div>
      {cardLength <= 0 &&
      <div className="mt-4">
        <p className="fund-wallet-info">
          You dont have bank card attached to your account yet?
          A Debit/Credit card is needed to fund your wallet
        </p>
      </div>
      }
      <div className="fund-wallet-add-card mt-4">
        {paymentChannel === "paystack"
          && (
          <>
            <PaystackButton
              className={cardLength > 0 ? "paystack-button paystack-white" : "paystack-button paystack-blue"}
              {...paystackProps}
            />
            <span className="ml-1 angle-right paystack"><FaAngleRight size={20} /></span>
          </>
          )}
        {paymentChannel === "stripe"
        && (
        <div className="stripe-element">
          <form>
            <CardElement
              options={cardElementOptions}
            />
            {stripeError && <span>{stripeErrorMsg}</span>}
          </form>

          <DefaultButton
            color="zd-blue"
            onClick={addCardStripe}
            disabled={requesting}
          >
            <span>{requesting ? <ButtonLoadingIcon /> : `Add card`}</span>
          </DefaultButton>
        </div>
        )}
      </div>
        <img src={Logo} alt="logo" className="fund-wallet-logo float-right" />
      {/*</div>*/}
    </div>

  </CardComponent>
);

export default AddCard;

AddCard.defaultProps = {
  paystackProps: {},
  paymentChannel: "",
  addCardStripe: () => {
    // your logic here...

  },
  requesting: false,
  stripeError: false,
  stripeErrorMsg: "",
};

AddCard.propTypes = {
  paystackProps: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.array],
  )),
  paymentChannel: PropTypes.string,
  addCardStripe: PropTypes.func,
  requesting: PropTypes.bool,
  stripeError: PropTypes.bool,
  stripeErrorMsg: PropTypes.string,
};
