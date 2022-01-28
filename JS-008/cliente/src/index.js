import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app";
import store from "./store";
import { applyMiddleware } from "redux";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);