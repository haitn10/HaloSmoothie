import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import AppCenter from "./components/AppCenter";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./styles/state";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider } from "react-redux";
import { api } from "./api/index";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppCenter />
    </Provider>
  </React.StrictMode>
);
