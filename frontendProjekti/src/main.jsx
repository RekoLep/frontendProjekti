import React from "react";
import ReactDOM from "react-dom/client"; 
import { HashRouter } from "react-router-dom";
import App from "./App";
import TrainingsList from "./TrainingsList";
import CalendarView from "./CalendarView";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
    <TrainingsList />
    <CalendarView />
  </HashRouter>
);
