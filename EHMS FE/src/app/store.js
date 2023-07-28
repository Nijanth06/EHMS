import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authUserReducer from "../app/features/authSlice";
import slider from "../app/features/slider";
import currentUser from "../app/features/currentUserData";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import createTransform from "redux-persist/es/createTransform";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "token", "role", "refreshToken", "userId"],
};

const persistedReducer = persistReducer(persistConfig, authUserReducer);
const reducer = combineReducers({
  auth: persistedReducer,
  slider,
  currentUser,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
export const selectCurrentToken = (state) => state.auth.token;
