import moment from "moment/moment";
import axios from "axios";
import { appConstants } from "../constants";
import { store } from "../state/redux/store";
import { history } from "../state/history";

export const appHelpers = {
  formatDate: (d) => {
    if (!d) return "";
    return moment(d.split("T")[0]).format("MMM DD, YYYY");
  },

  formatDateSpecific: (d, format) => moment(d).format(format || "MMM DD, YYYY"),
  getRequest(url) {
    const { auth } = store.getState();
    const { accessToken } = auth;
    const combinedHeader = {
      "x-access-token": `Bearer ${accessToken.token}`,
      "Content-Type": "application/json",
    };
    const config = { headers: combinedHeader };
    return axios
      .get(url, config)
      .then((res) => appHelpers.promiseResponse(res.data))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = appConstants.APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/login");
            }, 3000);
          }
          return appHelpers.promiseResponse(msg, appConstants.ERROR_RESPONSE);
          // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};
        } if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // return {status: appConstants.REQUEST_FAILURE, data: error.request};
          const errorMessage = error.request.status === 0
            ? appConstants.APP_INTERNET_CONNECTION_MESSAGE
            : error.request;

          return appHelpers.promiseResponse(
            errorMessage,
            appConstants.ERROR_RESPONSE,
          );
        }
        // Something happened in setting up the request that triggered an Error

        // return {status: appConstants.REQUEST_FAILURE, data: error.message};
        return appHelpers.promiseResponse(
          error.message,
          appConstants.ERROR_RESPONSE,
        );
      });
  },

  getThirdPartyRequest(url) {
    const combinedHeader = {
      "Content-Type": "application/json",
    };
    const config = { headers: combinedHeader };
    return axios
      .get(url, config)
      .then((res) => appHelpers.promiseResponse(res.data))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx

          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = appConstants.APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/login");
            }, 3000);
          }
          return appHelpers.promiseResponse(msg, appConstants.ERROR_RESPONSE);
          // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};
        } if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          //
          // return {status: appConstants.REQUEST_FAILURE, data: error.request};
          const errorMessage = error.request.status === 0
            ? appConstants.APP_INTERNET_CONNECTION_MESSAGE
            : error.request;

          return appHelpers.promiseResponse(
            errorMessage,
            appConstants.ERROR_RESPONSE,
          );
        }
        // Something happened in setting up the request that triggered an Error

        // return {status: appConstants.REQUEST_FAILURE, data: error.message};
        return appHelpers.promiseResponse(
          error.message,
          appConstants.ERROR_RESPONSE,
        );
      });
  },
  postRequest(url, payload, addedHeader = null) {
    const { auth } = store.getState();
    const { accessToken } = auth;
    let combinedHeader = {
      "x-access-token": `Bearer ${accessToken.token}`,
      "Content-Type": "application/json",
    };
    if (addedHeader) {
      combinedHeader = { ...combinedHeader, ...addedHeader };
    }
    const config = { headers: combinedHeader };
    return axios
      .post(url, payload, config)
      .then((res) => appHelpers.promiseResponse(res.data))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx

          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = appConstants.APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/login");
            }, 3000);
          }
          return appHelpers.promiseResponse(msg, appConstants.ERROR_RESPONSE);
          // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};
        } if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          //
          // return {status: appConstants.REQUEST_FAILURE, data: error.request};
          const errorMessage = error.request.status === 0
            ? appConstants.APP_INTERNET_CONNECTION_MESSAGE
            : error.request;
          return appHelpers.promiseResponse(
            errorMessage,
            appConstants.ERROR_RESPONSE,
          );
        }
        // Something happened in setting up the request that triggered an Error

        // return {status: appConstants.REQUEST_FAILURE, data: error.message};
        return appHelpers.promiseResponse(
          error.message,
          appConstants.ERROR_RESPONSE,
        );
      });
  },
  patchRequest(url, payload, addedHeader = null) {
    const { auth } = store.getState();
    const { accessToken } = auth;
    let combinedHeader = {
      "x-access-token": `Bearer ${accessToken.token}`,
      "Content-Type": "application/json",
    };
    if (addedHeader) {
      combinedHeader = { ...combinedHeader, ...addedHeader };
    }
    const config = { headers: combinedHeader };
    return axios
      .patch(url, payload, config)
      .then((res) => appHelpers.promiseResponse(res.data))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx

          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = appConstants.APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/login");
            }, 3000);
          }
          return appHelpers.promiseResponse(msg, appConstants.ERROR_RESPONSE);
          // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};
        } if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          //
          // return {status: appConstants.REQUEST_FAILURE, data: error.request};
          const errorMessage = error.request.status === 0
            ? appConstants.APP_INTERNET_CONNECTION_MESSAGE
            : error.request;
          return appHelpers.promiseResponse(
            errorMessage,
            appConstants.ERROR_RESPONSE,
          );
        }
        // Something happened in setting up the request that triggered an Error

        // return {status: appConstants.REQUEST_FAILURE, data: error.message};
        return appHelpers.promiseResponse(
          error.message,
          appConstants.ERROR_RESPONSE,
        );
      });
  },
  deleteRequest(url, addedHeader = null) {
    const { auth } = store.getState();
    const { accessToken } = auth;
    let combinedHeader = {
      "x-access-token": `Bearer ${accessToken.token}`,
      "Content-Type": "application/json",
    };

    if (addedHeader) {
      combinedHeader = { ...combinedHeader, ...addedHeader };
    }
    const config = { headers: combinedHeader };
    return axios
      .delete(url, config)
      .then((res) => appHelpers.promiseResponse(res.data))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx

          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = appConstants.APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/login");
            }, 3000);
          }
          return appHelpers.promiseResponse(msg, appConstants.ERROR_RESPONSE);
          // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};
        } if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          //
          // return {status: appConstants.REQUEST_FAILURE, data: error.request};
          const errorMessage = error.request.status === 0
            ? appConstants.APP_INTERNET_CONNECTION_MESSAGE
            : error.request;

          return appHelpers.promiseResponse(
            errorMessage,
            appConstants.ERROR_RESPONSE,
          );
        }
        // Something happened in setting up the request that triggered an Error

        // return {status: appConstants.REQUEST_FAILURE, data: error.message};
        return appHelpers.promiseResponse(
          error.message,
          appConstants.ERROR_RESPONSE,
        );
      });
  },

  formatPromiseResponse(res, resType) {
    const responseType = resType === undefined ? appConstants.SUCCESS_RESPONSE : resType;
    return { status: responseType, response: res };
  },

  promiseResponse(res, resType) {
    const responseType = resType === undefined ? appConstants.SUCCESS_RESPONSE : resType;
    return { status: responseType, response: res };
  },

  interpretErrorResponse(error) {
    let errorMessage = "";
    if (error.response === undefined) {
      errorMessage = "Please check your internet connectivity!";
    } else {
      errorMessage = error.response.data
        ? error.response.data
        : "Unable to handle request";
    }
    if (typeof errorMessage === "string") {
      return errorMessage;
    }
    return "Something went wrong!";
  },
  numberWithCommas: (x) => {
    if (x.length < 2) {
      return x;
    }
    x = x.toFixed(2);
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  },
  numberWithCommasOnly: (x) => {
    if (x === 0) return "0";
    if (!x) return "";
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  },

  formatLargeNumbersWithDecimals: (labelValue) =>
    // Nine Zeroes for Billions
    (Math.abs(Number(labelValue)) >= 1.0e9
      ? `${(Math.abs(Number(labelValue)) / 1.0e9).toFixed(1)}B`
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
        ? `${(Math.abs(Number(labelValue)) / 1.0e6).toFixed(1)}M`
        : // Three Zeroes for Thousands
        Math.abs(Number(labelValue)) >= 1.0e3
          ? `${(Math.abs(Number(labelValue)) / 1.0e3).toFixed(1)}K`
          : Math.abs(Number(labelValue))),
  formatLargeNumbers: (labelValue) =>
    // Nine Zeroes for Billions
    (Math.abs(Number(labelValue)) >= 1.0e9
      ? `${Math.abs(Number(labelValue)) / 1.0e9}B`
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
        ? `${Math.abs(Number(labelValue)) / 1.0e6}M`
        : // Three Zeroes for Thousands
        Math.abs(Number(labelValue)) >= 1.0e3
          ? `${Math.abs(Number(labelValue))}K`
          : Math.abs(Number(labelValue))),

  getCurrentDay() {
    const currentDay = {
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    };
    return currentDay;
  },
  randomArrayOfNumbers(length, multiplier) {
    return Array.from({ length }, () => Math.floor(Math.random() * multiplier));
  },
  findAllByKey(obj, keyToFind) {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => (key === keyToFind
        ? acc.concat(value)
        : typeof value === "object"
          ? acc.concat(appHelpers.findAllByKey(value, keyToFind))
          : acc),
      [],
    );
  },
  navigateRoute(route, pathState) {
    if (pathState) {
      return this.props.history.push({ pathname: route, state: pathState });
    }
    return this.props.history.push(route);
  },
  navigateToPreviousRoute() {
    this.props.history.goBack();
  },

};
