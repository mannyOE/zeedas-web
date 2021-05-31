import {
  WALLET_STATISTICS_SUCCESS, WALLET_ACTIVITIES_SUCCESS, BILLING_SUCCESS, WALLET_CARDS_SUCCESS,
  CLIENTS_IP,
} from "../constants";

const INIT_STATE = {
  walletStatistics: false,
  walletActivities: false,
  billing: false,
  walletCards: false,
  clientsIP: false,
};

export function walletStatistics(state = INIT_STATE.walletStatistics, action) {
  switch (action.type) {
    case WALLET_STATISTICS_SUCCESS:
      return action.walletStatistics;
    default:
      return state;
  }
}

export function walletActivities(state = INIT_STATE.walletActivities, action) {
  switch (action.type) {
    case WALLET_ACTIVITIES_SUCCESS:
      return action.walletActivities;
    default:
      return state;
  }
}

export function billing(state = INIT_STATE.billing, action) {
  switch (action.type) {
    case BILLING_SUCCESS:
      return action.billing;
    default:
      return state;
  }
}

export function walletCards(state = INIT_STATE.walletCards, action) {
  switch (action.type) {
    case WALLET_CARDS_SUCCESS:
      return action.walletCards;
    default:
      return state;
  }
}

export function clientsIP(state = INIT_STATE.clientsIP, action) {
  switch (action.type) {
    case CLIENTS_IP:
      return action.clientsIP;
    default:
      return state;
  }
}
