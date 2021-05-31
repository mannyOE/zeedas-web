import { appConstants } from "../../../constants";
// import {}
import { walletService } from "../../../services/wallet-service";
import { history } from "../../history";
import {
  WALLET_STATISTICS_SUCCESS,
  WALLET_ACTIVITIES_SUCCESS,
  BILLING_SUCCESS,
  WALLET_CARDS_SUCCESS,
  CLIENTS_IP,
} from "../constants";

function getWalletStatistics() {
  function success(walletStatistics) {
    return { type: WALLET_STATISTICS_SUCCESS, walletStatistics };
  }
  function failure(message) {
    return { type: appConstants.REQUEST_FAILURE, message };
  }

  return (dispatch) => walletService.getWalletStatistics().then(
    (response) => {
      if (response.error == null) {
        dispatch(success(response.response));
      } else {
        dispatch(failure(response));
      }
    },
    (error) => {
      const errorMessage = error.response.data
        ? error.response.data
        : "Unable to handle request";
      dispatch(failure(errorMessage));
    },
  );
}

function getWalletActivities() {
  function success(walletActivities) {
    return { type: WALLET_ACTIVITIES_SUCCESS, walletActivities };
  }
  function failure(message) {
    return { type: appConstants.REQUEST_FAILURE, message };
  }

  return (dispatch) => walletService.getWalletActivities().then(
    (response) => {
      if (response.error == null) {
        dispatch(success(response.response));
      } else {
        dispatch(failure(response));
      }
    },
    (error) => {
      const errorMessage = error.response.data
        ? error.response.data
        : "Unable to handle request";
      dispatch(failure(errorMessage));
    },
  );
}

function getBilling() {
  function success(billing) {
    return { type: BILLING_SUCCESS, billing };
  }
  function failure(message) {
    return { type: appConstants.REQUEST_FAILURE, message };
  }

  return (dispatch) => walletService.getBilling().then(
    (response) => {
      if (response.error == null) {
        dispatch(success(response.response));
      } else {
        dispatch(failure(response));
      }
    },
    (error) => {
      const errorMessage = error.response.data
        ? error.response.data
        : "Unable to handle request";
      dispatch(failure(errorMessage));
    },
  );
}

function getWalletCards() {
  function success(walletCards) {
    return { type: WALLET_CARDS_SUCCESS, walletCards };
  }
  function failure(message) {
    return { type: appConstants.REQUEST_FAILURE, message };
  }

  return (dispatch) => walletService.getWalletCards().then(
    (response) => {
      if (response.error == null) {
        dispatch(success(response.response));
      } else {
        dispatch(failure(response));
      }
    },
    (error) => {
      const errorMessage = error.response.data
        ? error.response.data
        : "Unable to handle request";
      dispatch(failure(errorMessage));
    },
  );
}

function getClientsIP() {
  function success(clientsIP) {
    return { type: CLIENTS_IP, clientsIP };
  }
  function failure(message) {
    return { type: appConstants.REQUEST_FAILURE, message };
  }

  return (dispatch) => walletService.getClientsIP().then(
    (response) => {
      if (response.error == null) {
        dispatch(success(response.response));
      } else {
        dispatch(failure(response));
      }
    },
    (error) => {
      const errorMessage = error.response.data
        ? error.response.data
        : "Unable to handle request";
      dispatch(failure(errorMessage));
    },
  );
}

// eslint-disable-next-line import/prefer-default-export
export const walletActions = {

  getWalletStatistics,
  getWalletActivities,
  getBilling,
  getWalletCards,
  getClientsIP,
};
