"use client";

import { useEffect, useState } from "react";

import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import Timeline from "./Agenda/Timeline";
import SmallCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";

import { EventType } from "@/interfaces/Calendar/EventType";
import { createEventCalendar } from "@/services/Calendar/createEventCalendar";
import Button from "@/components/Reusable/Button";
import { getCalendarByDate } from "@/services/Calendar/getCalendarByDate";

export default function Agenda() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const handleGetCalendarByDate = async () => {
      const events = await getCalendarByDate({ date: date ?? new Date() });
      if (events.success) {
        setEvents(events.message);
      } else {
        console.error("Error al obtener el calendario", events.message);
      }
    };
    handleGetCalendarByDate();
  }, [date]);

  const handleCreateEvent = async () => {
    const res = await createEventCalendar();
    if (res) {
      console.log("Evento creado:", res);
    } else {
      console.error("Error al crear el evento");
    }
  };

  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-2"
      link="/calendar"
      title="Calendar"
    >
      <div className="flex w-full h-full">
        <div className="flex flex-col gap-4">
          <SmallCalendar setDate={setDate} date={date} inView />
          <Button onClick={handleCreateEvent} button="tertiary" type="button">
            Nuevo Evento
          </Button>
        </div>
        <Timeline date={date} events={events} />
      </div>
    </TemplateDashboard>
  );
}
