import { applyMiddleware, createStore } from "redux";
import thunkMiddlewear from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./Reducers/rootReducer";

const middlewares = [thunkMiddlewear];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancer = [middlewareEnhancer];
const composedEnhancer = composeWithDevTools(...enhancer);

let store = createStore(rootReducer, composedEnhancer);

export default store;
