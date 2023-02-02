import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "./redux/createStore";
import AppCenter from "./components/AppCenter";


import './index.css';

const store = createStore();


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppCenter />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
