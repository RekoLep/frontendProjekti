import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { getTrainings } from "./TrainingsApi"; 

const localizer = momentLocalizer(moment);

export default function CalendarView() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const trainings = await getTrainings();
        const formattedEvents = trainings.map((training) => {
          const startDate = new Date(training.date);
          const endDate = new Date(startDate.getTime() + training.duration * 60000); 
          return {
            title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
            start: startDate,
            end: endDate,
          };
        });
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };

    fetchTrainings();
  }, []);

  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 40px)" }}
        views={["month", "week", "day"]}
        defaultView="week"
      />
    </div>
  );
}
