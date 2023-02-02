import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import profile from "../components/profile/reducer";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return createStore(
    combineReducers({
      profile,
    }),
    applyMiddleware(thunk)
  );
};