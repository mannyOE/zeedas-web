/* eslint-disable import/prefer-default-export */

/* Clean up to use "servicehelpers.genericRequest" */

import axios from "axios";
import { store } from "../state/redux/store";
import {
  APP_INTERNET_CONNECTION_MESSAGE,
  ERROR_RESPONSE,
  APP_USER_SESSION_EXPIRED_MESSAGE,
  SUCCESS_RESPONSE,
} from "./constants";
import { history } from "../state/history";

const axiosInstance = axios.create();

export const serviceHelpers = {
  requestMethods: {
    PUT: "put",
    GET: "get",
    POST: "post",
    DELETE: "delete",
  },
  getRequest(url) {
    const { auth } = store.getState();
    const combinedHeader = {};

    if (auth.accessToken) {
      combinedHeader["x-access-token"] = `Bearer ${auth.accessToken.token}`;
      combinedHeader["Content-Type"] = "application/json";
    }

    const config = { headers: combinedHeader };

    return axios
      .get(url, config)
      .then((res) => serviceHelpers.promiseResponse(res.data))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //
          //
          //
          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/authentication/login");
            }, 3000);
          }
          return serviceHelpers.promiseResponse(msg, ERROR_RESPONSE);
        }
        if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // ;
          // return {status: REQUEST_FAILURE, data: error.request};
          const errorMessage = error.request.status === 0
            ? APP_INTERNET_CONNECTION_MESSAGE
            : error.request;

          return serviceHelpers.promiseResponse(errorMessage, ERROR_RESPONSE);
        }
        // Something happened in setting up the request that triggered an Error
        //
        // return {status: REQUEST_FAILURE, data: error.message};
        return serviceHelpers.promiseResponse(error.message, ERROR_RESPONSE);
      });
  },

  genericRequest(requestType, url, payload = null, addedHeader) {
    const { auth } = store.getState();
    let combinedHeader = {};
    if (auth.accessToken) {
      combinedHeader["x-access-token"] = `Bearer ${auth.accessToken.token}`;
      combinedHeader["Content-Type"] = "application/json";
    }
    if (addedHeader) {
      combinedHeader = { ...combinedHeader, ...addedHeader };
    }

    const config = { headers: combinedHeader };
    return axios(url, {
      method: requestType,
      data: payload,
      headers: combinedHeader,
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error.response) {
          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/authentication/login");
            }, 3000);
          }
          throw serviceHelpers.promiseResponse(msg, ERROR_RESPONSE);
        }
        if (error.request) {
          const errorMessage = error.request.status === 0
            ? APP_INTERNET_CONNECTION_MESSAGE
            : error.request;

          throw serviceHelpers.promiseResponse(errorMessage, ERROR_RESPONSE);
        }
        throw serviceHelpers.promiseResponse(error.message, ERROR_RESPONSE);
      });
  },

  postRequest(url, payload, addedHeader = null) {
    const { auth } = store.getState();
    let combinedHeader = {};
    if (auth.accessToken) {
      combinedHeader["x-access-token"] = `Bearer ${auth.accessToken.token}`;
      combinedHeader["Content-Type"] = "application/json";
    }

    if (addedHeader) {
      combinedHeader = { ...combinedHeader, ...addedHeader };
    }

    const config = { headers: combinedHeader };
    return axios
      .post(url, payload, config)
      .then((res) => serviceHelpers.promiseResponse(res.data))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //
          //
          //
          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/authentication/login");
            }, 3000);
          }
          return serviceHelpers.promiseResponse(msg, ERROR_RESPONSE);
          // return {statTs: REQUEST_FAILURE, data: error.response.data};
        }
        if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // ;
          // return {status: REQUEST_FAILURE, data: error.request};
          const errorMessage = error.request.status === 0
            ? APP_INTERNET_CONNECTION_MESSAGE
            : error.request;

          return serviceHelpers.promiseResponse(errorMessage, ERROR_RESPONSE);
        }
        // Something happened in setting up the request that triggered an Error
        //
        // return {status: REQUEST_FAILURE, data: error.message};
        return serviceHelpers.promiseResponse(error.message, ERROR_RESPONSE);
      });
  },
  putRequest(url, payload, addedHeader = null) {
    const { auth } = store.getState();
    let combinedHeader = {};
    if (auth.accessToken) {
      combinedHeader["x-access-token"] = `Bearer ${auth.accessToken.token}`;
      combinedHeader["Content-Type"] = "application/json";
    }

    if (addedHeader) {
      combinedHeader = { ...combinedHeader, ...addedHeader };
    }

    const config = { headers: combinedHeader };
    return axios
      .put(url, payload, config)
      .then((res) => serviceHelpers.promiseResponse(res.data))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //
          //
          //
          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/authentication/login");
            }, 3000);
          }
          return serviceHelpers.promiseResponse(msg, ERROR_RESPONSE);
          // return {statTs: REQUEST_FAILURE, data: error.response.data};
        }
        if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // ;
          // return {status: REQUEST_FAILURE, data: error.request};
          const errorMessage = error.request.status === 0
            ? APP_INTERNET_CONNECTION_MESSAGE
            : error.request;
          return serviceHelpers.promiseResponse(errorMessage, ERROR_RESPONSE);
        }
        // Something happened in setting up the request that triggered an Error
        //
        // return {status: REQUEST_FAILURE, data: error.message};
        return serviceHelpers.promiseResponse(error.message, ERROR_RESPONSE);
      });
  },
  patchRequest(url, payload, addedHeader = null) {
    const { auth } = store.getState();
    let combinedHeader = {};
    if (auth.accessToken) {
      combinedHeader["x-access-token"] = `Bearer ${auth.accessToken.token}`;
      combinedHeader["Content-Type"] = "application/json";
    }
    if (addedHeader) {
      combinedHeader = { ...combinedHeader, ...addedHeader };
    }
    const config = { headers: combinedHeader };
    return axios
      .patch(url, payload, config)
      .then((res) => serviceHelpers.promiseResponse(res.data))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //
          //
          //
          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/authentication/login");
            }, 3000);
          }
          return serviceHelpers.promiseResponse(msg, ERROR_RESPONSE);
          // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};
        }
        if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // ;
          // return {status: appConstants.REQUEST_FAILURE, data: error.request};
          const errorMessage = error.request.status === 0
            ? APP_INTERNET_CONNECTION_MESSAGE
            : error.request;
          return serviceHelpers.promiseResponse(errorMessage, ERROR_RESPONSE);
        }
        // Something happened in setting up the request that triggered an Error
        //
        // return {status: appConstants.REQUEST_FAILURE, data: error.message};
        return serviceHelpers.promiseResponse(error.message, ERROR_RESPONSE);
      });
  },

  deleteRequest(url, addedHeader = null) {
    const { auth } = store.getState();
    let combinedHeader = {};
    if (auth.accessToken) {
      combinedHeader["x-access-token"] = `Bearer ${auth.accessToken.token}`;
      combinedHeader["Content-Type"] = "application/json";
    }

    if (addedHeader) {
      combinedHeader = { ...combinedHeader, ...addedHeader };
    }
    const config = { headers: combinedHeader };
    return axios
      .delete(url, config)
      .then((res) => serviceHelpers.promiseResponse(res.data))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //
          //
          //
          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/authentication/login");
            }, 3000);
          }
          return serviceHelpers.promiseResponse(msg, ERROR_RESPONSE);
          // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};
        }
        if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // ;
          // return {status: appConstants.REQUEST_FAILURE, data: error.request};
          const errorMessage = error.request.status === 0
            ? APP_INTERNET_CONNECTION_MESSAGE
            : error.request;

          return serviceHelpers.promiseResponse(errorMessage, ERROR_RESPONSE);
        }
        // Something happened in setting up the request that triggered an Error
        //
        // return {status: appConstants.REQUEST_FAILURE, data: error.message};
        return serviceHelpers.promiseResponse(error.message, ERROR_RESPONSE);
      });
  },
  postFormDataRequest(url, formData, addedHeader = null) {
    const { auth } = store.getState();

    // const reqHeader = addedHeader || { "Content-Type": "multipart/form-data" };
    // const config = { headers: reqHeader };

    let combinedHeader = {};
    if (auth.accessToken) {
      combinedHeader["x-access-token"] = `Bearer ${auth.accessToken.token}`;
      combinedHeader["Content-Type"] = "multipart/form-data";
    }

    if (addedHeader) {
      combinedHeader = { ...combinedHeader, ...addedHeader };
    }
    const config = { headers: combinedHeader };

    return axios
      .post(url, formData, config)
      .then((res) => serviceHelpers.promiseResponse(res.data))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //
          //
          //
          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/authentication/login");
            }, 3000);
          }
          return serviceHelpers.promiseResponse(msg, ERROR_RESPONSE);
          // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};
        }
        if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // ;
          // return {status: appConstants.REQUEST_FAILURE, data: error.request};
          const errorMessage = error.request.status === 0
            ? APP_INTERNET_CONNECTION_MESSAGE
            : error.request;
          return serviceHelpers.promiseResponse(errorMessage, ERROR_RESPONSE);
        }
        // Something happened in setting up the request that triggered an Error
        //
        // return {status: appConstants.REQUEST_FAILURE, data: error.message};
        return serviceHelpers.promiseResponse(error.message, ERROR_RESPONSE);
      });
  },
  putFormDataRequest(url, formData, addedHeader = null) {
    const { auth } = store.getState();

    // const reqHeader = addedHeader || { "Content-Type": "multipart/form-data" };
    // const config = { headers: reqHeader };

    let combinedHeader = {};
    if (auth.accessToken) {
      combinedHeader["x-access-token"] = `Bearer ${auth.accessToken.token}`;
      combinedHeader["Content-Type"] = "multipart/form-data";
    }

    if (addedHeader) {
      combinedHeader = { ...combinedHeader, ...addedHeader };
    }
    const config = { headers: combinedHeader };

    return axios
      .put(url, formData, config)
      .then((res) => serviceHelpers.promiseResponse(res.data))
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //
          //
          //
          let msg = error.response.data;
          if (error.response.status === 500) {
            msg = "Oops, something went wrong";
          } else if (error.response.status === 404) {
            msg = "Resource not found";
          } else if (error.response.status === 401) {
            msg = APP_USER_SESSION_EXPIRED_MESSAGE;
            setTimeout(() => {
              history.push("/authentication/login");
            }, 3000);
          }
          return serviceHelpers.promiseResponse(msg, ERROR_RESPONSE);
          // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};
        }
        if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // ;
          // return {status: appConstants.REQUEST_FAILURE, data: error.request};
          const errorMessage = error.request.status === 0
            ? APP_INTERNET_CONNECTION_MESSAGE
            : error.request;
          return serviceHelpers.promiseResponse(errorMessage, ERROR_RESPONSE);
        }
        // Something happened in setting up the request that triggered an Error
        //
        // return {status: appConstants.REQUEST_FAILURE, data: error.message};
        return serviceHelpers.promiseResponse(error.message, ERROR_RESPONSE);
      });
  },
  formatPromiseResponse(res, resType) {
    const responseType = resType === undefined ? SUCCESS_RESPONSE : resType;
    return { status: responseType, response: res };
  },
  promiseResponse(res, resType) {
    const responseType = resType === undefined && res.code >= 200 ? SUCCESS_RESPONSE : resType;
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
};
