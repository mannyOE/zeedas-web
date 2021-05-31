import { appHelpers } from "../helpers/app.helpers";
import { appConstants } from "../constants";

const PAYMENT_URL = "wallet";
const BILLING_URL = "billing";

const WALLET_ACTIVITIES = `${PAYMENT_URL}/activities`;
const CARDS = `${PAYMENT_URL}/cards`;
const PAYSTACK_ADD_CARD = `${PAYMENT_URL}/paystack-add-card`;
const PAYSTACK_INITIATE_CARD = `${PAYMENT_URL}/paystack-initiate-card`;
const INITIATE_STRIPE = `${PAYMENT_URL}/stripe-initiate-card`;
const STRIPE_COMPLETE_CARD = `${PAYMENT_URL}/stripe-complete-card`;
const FUND_WALLET = `${PAYMENT_URL}/charge-card`;
// const SEND_REFERRALS = `${PAYMENT_URL}/send-referals`;

// const WALLET_STATISTICS
function getWalletStatistics() {
  return (
    appHelpers
      // .getRequest(`${appConstants.APP_URL}`)
      .getRequest(`${appConstants.WALLET_BASE_URL}/payment/${PAYMENT_URL}`)
      .then((res) => res)
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

function getWalletActivities() {
  return (
    appHelpers
      // .getRequest(`${appConstants.APP_URL}`)
      .getRequest(`${appConstants.WALLET_BASE_URL}/payment/${WALLET_ACTIVITIES}`)
      .then((res) => res)
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

function getBilling() {
  return (
    appHelpers
      // .getRequest(`${appConstants.APP_URL}`)
      .getRequest(`${appConstants.WALLET_BASE_URL}/payment/${BILLING_URL}`)
      .then((res) => res)
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

function getWalletCards() {
  return (
    appHelpers
      // .getRequest(`${appConstants.APP_URL}`)
      .getRequest(`${appConstants.WALLET_BASE_URL}/payment/${CARDS}`)
      .then((res) => res)
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}
function payStackAddCard(payload) {
  return (
    appHelpers
      // .postRequest(`${appConstants.PAS_URL}/api/Invoice/GetVoidInvoiceRequest`, payload)
      .postRequest(
        `${appConstants.WALLET_BASE_URL}/payment/${PAYSTACK_ADD_CARD}`,
        payload,
      )
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return appHelpers.formatPromiseResponse(
          error,
          appConstants.ERROR_RESPONSE,
        );
      })
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

function payInitiateCard(payload) {
  return (
    appHelpers
      // .postRequest(`${appConstants.PAS_URL}/api/Invoice/GetVoidInvoiceRequest`, payload)
      .getRequest(
        `${appConstants.WALLET_BASE_URL}/payment/${PAYSTACK_INITIATE_CARD}`,
        payload,
      )
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return appHelpers.formatPromiseResponse(
          error,
          appConstants.ERROR_RESPONSE,
        );
      })
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

function initiateStripe(payload) {
  return (
    appHelpers
      // .postRequest(`${appConstants.PAS_URL}/api/Invoice/GetVoidInvoiceRequest`, payload)
      .postRequest(
        `${appConstants.WALLET_BASE_URL}/payment/${INITIATE_STRIPE}`,
        payload,
      )
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return appHelpers.formatPromiseResponse(
          error,
          appConstants.ERROR_RESPONSE,
        );
      })
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

function stripeCompleteCard(payload) {
  return (
    appHelpers
      // .postRequest(`${appConstants.PAS_URL}/api/Invoice/GetVoidInvoiceRequest`, payload)
      .postRequest(
        `${appConstants.WALLET_BASE_URL}/payment/${STRIPE_COMPLETE_CARD}`,
        payload,
      )
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return appHelpers.formatPromiseResponse(
          error,
          appConstants.ERROR_RESPONSE,
        );
      })
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

function fundWallet(payload) {
  return (
    appHelpers
      // .postRequest(`${appConstants.PAS_URL}/api/Invoice/GetVoidInvoiceRequest`, payload)
      .postRequest(
        `${appConstants.WALLET_BASE_URL}/payment/${FUND_WALLET}`,
        payload,
      )
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return appHelpers.formatPromiseResponse(
          error,
          appConstants.ERROR_RESPONSE,
        );
      })
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

function deleteCard(cardId) {
  return (
    appHelpers
      // .postRequest(`${appConstants.PAS_URL}/api/Invoice/GetVoidInvoiceRequest`, payload)
      .deleteRequest(
        `${appConstants.WALLET_BASE_URL}/payment/${CARDS}/${cardId}`,
      )
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return appHelpers.formatPromiseResponse(
          error,
          appConstants.ERROR_RESPONSE,
        );
      })
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

function deleteWalletActivities() {
  return (
    appHelpers
      // .postRequest(`${appConstants.PAS_URL}/api/Invoice/GetVoidInvoiceRequest`, payload)
      .deleteRequest(
        `${appConstants.WALLET_BASE_URL}/payment/${WALLET_ACTIVITIES}`,
      )
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return appHelpers.formatPromiseResponse(
          error,
          appConstants.ERROR_RESPONSE,
        );
      })
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

function setDefaultCard(cardId) {
  return (
    appHelpers
      // .postRequest(`${appConstants.PAS_URL}/api/Invoice/GetVoidInvoiceRequest`, payload)
      .patchRequest(
        `${appConstants.WALLET_BASE_URL}/payment/${CARDS}/${cardId}`,
      )
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return appHelpers.formatPromiseResponse(
          error,
          appConstants.ERROR_RESPONSE,
        );
      })
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

/* Third Party APIs */
function getClientsIP() {
  return (
    appHelpers
      .getThirdPartyRequest("https://api.ipify.org")
      .then((res) => res)
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

function getClientsLocation(payload) {
  return (
    appHelpers
      .getThirdPartyRequest(`https://api.ipstack.com/${payload.ip}?access_key=${payload.accessKey}`)
      .then((res) => res)
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

function sendReferrals(payload) {
  return (
    appHelpers
      // .postRequest(`${appConstants.PAS_URL}/api/Invoice/GetVoidInvoiceRequest`, payload)
      .postRequest(
        "https://api.qa.zeedas.com/payment/billing/send-referals",
        payload,
      )
      .then((res) => {
        const { error } = res.response;
        if (!error) {
          return res;
        }
        return appHelpers.formatPromiseResponse(
          error,
          appConstants.ERROR_RESPONSE,
        );
      })
      .catch((error) => {
        const errorMessage = appHelpers.interpretErrorResponse(error);
        return appHelpers.formatPromiseResponse(
          errorMessage,
          appConstants.ERROR_RESPONSE,
        );
      })
  );
}

// eslint-disable-next-line import/prefer-default-export
export const walletService = {
  getClientsIP,
  getWalletStatistics,
  getWalletActivities,
  getBilling,
  getWalletCards,
  payStackAddCard,
  initiateStripe,
  stripeCompleteCard,
  fundWallet,
  deleteCard,
  deleteWalletActivities,
  setDefaultCard,
  payInitiateCard,
  getClientsLocation,
  sendReferrals,
};
