import React from "react";
import ReactDOM from "react-dom/client"; 
import { HashRouter } from "react-router-dom";
import App from "./App";
import TrainingsList from "./TrainingsList";
import CalendarView from "./CalendarView";
import StatisticsPage from "./StatisticsPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
    <TrainingsList />
    <CalendarView />
    <StatisticsPage />
  </HashRouter>
);
