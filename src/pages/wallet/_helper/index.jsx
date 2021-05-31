import React from "react";
// import MasterCard from "../../../zeedas-assets/icons/master-card";
import IconVisa from "../../../zeedas-assets/icons/icon-visa";
import IconFundWallet from "../../../zeedas-assets/icons/icon-fund-wallet";
import IconDiscover from "../../../zeedas-assets/icons/icon-discover";
import IconUnionPay from "../../../zeedas-assets/icons/icon-union-pay";
import IconDinersClub from "../../../zeedas-assets/icons/icon-diners-club";
import IconAmericanExpress from "../../../zeedas-assets/icons/icon-american-express";
import IconMastercard2 from "../../../zeedas-assets/icons/icon-mastercard-2";

// eslint-disable-next-line import/prefer-default-export
export const walletHelpers = {
  creditCard(cardType, defaultHeight, defaultWidth, color) {
    let logo;
    switch (cardType) {
      case 'mastercard':
        // logo = <MasterCard />;
        logo = (
          <IconMastercard2
            width1={defaultWidth ? 50: 50}
            height1={defaultHeight ? 31 : 50}
          />
        );
        break;
      case 'visa':
        logo = (
          <IconVisa
            fill={color || "#fff"}
            width1={50}
            height1={defaultHeight ? 21 : 50}
            height2={21}
          />
        );
        break;
      case 'discover':
        logo = (
          <IconDiscover
            width1={50}
            height1={50}
          />
        );
        break;
      case 'unionpay':
        logo = (
          <IconUnionPay
            width1={50}
            height1={50}
          />
        );
        break;
      case 'diners':
        logo = (
          <IconDinersClub
            width1={50}
            height1={50}

          />
        );
        break;
      case 'amex':
        logo = (
          <IconAmericanExpress
            width1={50}
            height1={50}
          />
        );
        break;
      default:
        logo = (
          <IconFundWallet
            width={35}
            height={50}
            fill={color || "#fff"}
          />
        );
    }
    return logo;
  },
  currencySign(currency) {
    let sign = <span></span>;
    if (currency === "USD") {
      sign = <span>&#36;</span>;
    } if (currency === "NGN") {
      sign = <span>&#8358;</span>;
    } return sign;
  },
  sign(transactionType) {
    if (transactionType === "credit") {
      return <span>+</span>;
    } if (transactionType === "debit") {
      return <span>-</span>;
    }
    return <span />;
  },
  changeToLowerCase(obj) {
    const newObj = obj.map((item) => {
      for (const key in item) {
        const upper = key.charAt(0).toUpperCase() + key.slice(1);
        // check if it already wasn't uppercase
        if (upper !== key) {
          item[upper] = item[key];
          delete item[key];
        }
      }
      return item;
    });
    return newObj;
  },
};
