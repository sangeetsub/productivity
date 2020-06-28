import { combineReducers } from "redux";
import { auth } from "./auth";
import { appState } from "./appState";

export const rootReducer = combineReducers({
  auth,
  appState,
});
