"use client";

import { useEffect, useState } from "react";

import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import Timeline from "./Agenda/Timeline";
import SmallCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";

import { useDashboardStore } from "@/stores/dashboardStore";
import { isSameMonth } from "date-fns";
import CalendarUtils from "@/lib/CalendarUtils";

export default function Agenda() {
  const { events, setEvents, setTasks, loadingEvents, setLoadingEvents } =
    useDashboardStore();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (currentMonth && isSameMonth(date ?? new Date(), currentMonth)) {
      return;
    }

    const { handleGetCalendarOfMonthByDate } = CalendarUtils({
      firstDate: date ?? new Date(),
      secondDate: date ?? new Date(),
      date: date ?? new Date(),
      setEvents,
      setCurrentMonth,
      setLoadingEvents,
      currentMonth,
    });

    handleGetCalendarOfMonthByDate(date ?? new Date());
  }, [date, setEvents]);

  return (
    <TemplateDashboard
      grid={`col-span-4 row-span-4 row-start-2`}
      link="/calendar"
      title="Calendario"
      id="agenda-component"
    >
      <div className="flex flex-col xl:flex-row w-full h-full gap-4">
        <SmallCalendar setDate={setDate} date={date ?? new Date()} inView btn />
        <Timeline
          date={date}
          events={events}
          setEvents={setEvents}
          setTasks={setTasks}
          loadingEvents={loadingEvents}
        />
      </div>
    </TemplateDashboard>
  );
}
