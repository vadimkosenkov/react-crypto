import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import portfolioSlice from "./toolkitSlice/portfolioSlice";
import cryptoListSlice from "./toolkitSlice/cryptoListSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    portfolio: portfolioSlice,
    cryptoList: cryptoListSlice,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
