import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { createLogger } from "redux-logger";
import reducers from "./reducers";
import activityMiddleware from "../middlewares";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["requests"],
};

const logger = createLogger();

let middleware = [thunkMiddleware, activityMiddleware];
if (process.env.NODE_ENV === "development") middleware = [...middleware, logger];

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, applyMiddleware(...middleware));

export const persist = persistStore(store);
