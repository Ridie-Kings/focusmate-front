"use client";

import { useContext, useEffect, useState } from "react";
import debounce from "lodash/debounce";

import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import Timeline from "./Agenda/Timeline";
import SmallCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";

import { getCalendarByDate } from "@/services/Calendar/getCalendarByDate";
import { DashboardContext } from "@/components/Provider/DashboardProvider";
import { format } from "date-fns";

export default function Agenda() {
  const { events, setEvents, setTasks, loadingEvents, setLoadingEvents } =
    useContext(DashboardContext);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const handleGetCalendarByDate = async (dateToFetch: Date) => {
      setLoadingEvents(true);
      const events = await getCalendarByDate({
        date: format(dateToFetch, "yyyy-MM-dd"),
      });
      if (events.success) {
        setEvents(events.res);
        setLoadingEvents(false);
      } else {
        console.error("Error al obtener el calendario", events.res);
        setEvents([]);
      }
    };

    const debouncedFetch = debounce((dateToFetch: Date) => {
      handleGetCalendarByDate(dateToFetch);
      setLoadingEvents(false);
    }, 500);

    debouncedFetch(date ?? new Date());
    setLoadingEvents(true);
    return () => {
      debouncedFetch.cancel();
    };
  }, [date, setEvents]);

  return (
    <TemplateDashboard
      grid={`col-span-4 row-span-4 row-start-2`}
      link="/calendar"
      title="Calendario"
    >
      <div className="flex flex-col xl:flex-row w-full h-full gap-4">
        <SmallCalendar
          eventos
          setDate={setDate}
          date={date ?? new Date()}
          inView
          btn
        />
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
