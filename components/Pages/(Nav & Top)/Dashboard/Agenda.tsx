"use client";

import { useContext, useEffect, useState } from "react";

import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import Timeline from "./Agenda/Timeline";
import SmallCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";

import Button from "@/components/Reusable/Button";
import { getCalendarByDate } from "@/services/Calendar/getCalendarByDate";
import { DashboardContext } from "@/components/Provider/DashboardProvider";
import { ModalContext } from "@/components/Provider/ModalProvider";

export default function Agenda() {
  const { events, setEvents } = useContext(DashboardContext);
  const { setIsOpen } = useContext(ModalContext);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const handleGetCalendarByDate = async () => {
      date?.setHours(8);
      const events = await getCalendarByDate({ date: date ?? new Date() });

      if (events.success) {
        setEvents(events.res);
      } else {
        console.error("Error al obtener el calendario", events.res);
        setEvents([]);
      }
    };
    handleGetCalendarByDate();
  }, [date]);

  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-2"
      link="/calendar"
      title="Calendario"
    >
      <div className="flex w-full h-full">
        <div className="flex flex-col gap-4">
          <SmallCalendar setDate={setDate} date={date} inView />
          <Button
            onClick={() => setIsOpen("event")}
            size="large"
            button="tertiary"
            type="button"
          >
            Nuevo Evento
          </Button>
        </div>
        <Timeline date={date} events={events} setEvents={setEvents} />
      </div>
    </TemplateDashboard>
  );
}
