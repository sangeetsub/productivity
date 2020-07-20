import { combineReducers } from "redux";
import { auth } from "./auth";
import { appState } from "./appState";
import { tasks } from "./tasks";

export const rootReducer = combineReducers({
  auth,
  appState,
  tasks,
});
