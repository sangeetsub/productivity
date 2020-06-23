import React, { useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

function TimeMetrix() {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      var calendarEl = document.getElementById("calendar");

      var calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
      });

      calendar.render();
    });
    return () => {};
  }, []);

  return <div>Cal</div>;
}

export default TimeMetrix;
