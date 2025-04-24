"use client";

import CalendarInfo from "@/components/Pages/(Nav & Top)/Calendar/CalendarContainer/CalendarInfo";
import Calendar from "@/components/Elements/General/Calendar";
import { useContext, useState, useEffect } from "react";
import { CalendarContext } from "@/components/Provider/CalendarProvider";
import { getCalendarByDate } from "@/services/Calendar/getCalendarByDate";
import { TaskType } from "@/interfaces/Task/TaskType";
import { getCalendarByRange } from "@/services/Calendar/getCalendarByRange";

import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { es } from "date-fns/locale";

export default function CalendarPage() {
  const [navType, setNavType] = useState<string>("Día");
  const { date, setDate } = useContext(CalendarContext);
  const [events, setEvents] = useState<TaskType[]>([]);

  useEffect(() => {
    const storedCalendar = localStorage.getItem("navCalendar") || "Día";
    setNavType(storedCalendar);
  }, []);

  const updateNavType = (type: string): void => {
    setNavType(type);
    localStorage.setItem("navCalendar", type);
  };

  useEffect(() => {
    let firstDate: Date;
    let secondDate: Date;

    if (navType === "Mes") {
      firstDate = startOfWeek(startOfMonth(date ?? new Date()), { locale: es });
      secondDate = endOfWeek(endOfMonth(date ?? new Date()), { locale: es });
    } else {
      firstDate = startOfDay(
        startOfWeek(date ?? new Date(), { weekStartsOn: 1 })
      );
      secondDate = endOfDay(endOfWeek(date ?? new Date(), { weekStartsOn: 1 }));
    }

    const handleGetCalendarByRange = async () => {
      const event = await getCalendarByRange({ firstDate, secondDate });

      if (event.success) {
        setEvents(event.res);
      } else {
        console.error("Error al obtener el calendario", event.res);
        setEvents([]);
      }
    };

    const handleGetCalendarByDate = async () => {
      const event = await getCalendarByDate({ date: date ?? new Date() });
      console.log(event);

      if (event.success) {
        setEvents(event.res);
      } else {
        console.error("Error al obtener el calendario", event.res);
        setEvents([]);
      }
    };

    if (navType === "Día") handleGetCalendarByDate();
    else handleGetCalendarByRange();
  }, [date, navType]);

  console.log(events);

  return (
    <section className="flex flex-1 h-full gap-6 p-6 overflow-hidden transition-all duration-300">
      <div className="w-1/3 2xl:w-1/4 h-full flex flex-col gap-2">
        <Calendar
          date={date}
          setDate={setDate}
          className="border-2 rounded-lg p-2"
          inView={navType !== "Month"}
          btn
        />
        {/* <Categories /> */}
      </div>
      <CalendarInfo
        events={events}
        navType={navType}
        setNavType={(value) => {
          if (typeof value === "function") {
            setNavType((prev) => {
              const newValue = value(prev);
              updateNavType(newValue);
              return newValue;
            });
          } else {
            updateNavType(value);
          }
        }}
        date={date}
        setDate={setDate}
      />
    </section>
  );
}
