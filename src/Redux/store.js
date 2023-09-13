import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import ThunkMiddleware from "redux-thunk";

//?     DEV TOOLS
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//?      STORE
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(ThunkMiddleware))
);

export default store;