import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import TrainingsList from "./TrainingsList";
import CalendarView from "./CalendarView";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <TrainingsList />
    <CalendarView />
  </BrowserRouter>
);
