import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import AppCenter from "./components/AppCenter";
import { StoreProvider } from "./store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <AppCenter />
    </StoreProvider>
  </React.StrictMode>
);
