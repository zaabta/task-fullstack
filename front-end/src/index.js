import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import TaskContext from "./context/Tasks";
import NotificationCTX from "./context/AlertContex";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NotificationCTX>
      <TaskContext>
        <App />
      </TaskContext>
    </NotificationCTX>
  </BrowserRouter>
);
