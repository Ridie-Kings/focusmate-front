"use client";

import CalendarInfo from "@/components/Pages/(Nav & Top)/Calendar/CalendarContainer/CalendarInfo";
import { useContext, useState, useEffect } from "react";
import { CalendarContext } from "@/components/Provider/CalendarProvider";
import { TaskType } from "@/interfaces/Task/TaskType";
import SmallCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";

import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { es } from "date-fns/locale";

import { debounce } from "lodash";
import CalendarUtils from "@/lib/CalendarUtils";
import { NavTypeType } from "@/interfaces/Calendar/CalendarType";
import ListEvents from "./Calendar/CalendarContainer/ListEvents";

export default function CalendarPage() {
  const [navType, setNavType] = useState<NavTypeType>("Día");
  const { date, setDate } = useContext(CalendarContext);
  const [events, setEvents] = useState<TaskType[]>([]);

  useEffect(() => {
    const storedCalendar = localStorage.getItem("navCalendar") || "Día";
    setNavType(storedCalendar as NavTypeType);
  }, []);

  const updateNavType = (type: NavTypeType): void => {
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

    const { handleGetCalendarByRange, handleGetCalendarByDate } = CalendarUtils(
      {
        firstDate,
        secondDate,
        date,
        setEvents,
      }
    );

    const debouncedFetch = debounce(() => {
      if (navType === "Día") {
        handleGetCalendarByDate();
      } else {
        handleGetCalendarByRange();
      }
    }, 500);

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [date, navType]);

  return (
    <section className="flex sm:flex-row flex-col flex-1 h-full sm:gap-6 p-6 overflow-hidden transition-all duration-300">
      <div className="w-full sm:w-1/3 xl:w-1/4 h-full flex flex-col gap-2">
        <SmallCalendar
          eventos
          setDate={setDate}
          date={date ?? new Date()}
          inView
        />
        <ListEvents items={events} />
      </div>
      <CalendarInfo
        events={events}
        setEvents={setEvents}
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
        date={date ?? new Date()}
        setDate={setDate}
      />
    </section>
  );
}
