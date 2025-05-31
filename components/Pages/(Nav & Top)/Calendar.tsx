"use client";

import CalendarInfo from "@/components/Pages/(Nav & Top)/Calendar/CalendarContainer/CalendarInfo";
import { useState, useEffect } from "react";
import { useCalendarStore } from "@/stores/calendarStore";
import SmallCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";

import { isSameMonth } from "date-fns";

import CalendarUtils from "@/lib/CalendarUtils";
import { NavTypeType } from "@/interfaces/Calendar/CalendarType";
import ListEvents from "./Calendar/CalendarContainer/ListEvents";
import { useDashboardStore } from "@/stores/dashboardStore";

export default function CalendarPage() {
  const [navType, setNavType] = useState<NavTypeType>("Día");
  const { date, setDate } = useCalendarStore();
  const [currentMonth, setCurrentMonth] = useState<Date | undefined>(undefined);
  const { setLoadingEvents, events, setEvents, loadingEvents } =
    useDashboardStore();

  useEffect(() => {
    const storedCalendar = localStorage.getItem("navCalendar") || "Día";
    setNavType(storedCalendar as NavTypeType);
  }, []);

  const updateNavType = (type: NavTypeType): void => {
    setNavType(type);
    localStorage.setItem("navCalendar", type);
  };

  useEffect(() => {
    if (currentMonth && isSameMonth(date ?? new Date(), currentMonth)) {
      return;
    }

    const { handleGetCalendarOfMonthByDate } = CalendarUtils({
      firstDate: date ?? new Date(),
      secondDate: date ?? new Date(),
      date: date,
      setEvents,
      setCurrentMonth,
      setLoadingEvents,
      currentMonth,
    });

    handleGetCalendarOfMonthByDate(date ?? new Date());
  }, [date, navType]);

  return (
    <section className="flex sm:flex-row flex-col flex-1 h-full sm:gap-6 p-6 overflow-hidden transition-all duration-300">
      <div className="w-full sm:w-1/3 xl:w-1/4 h-full flex flex-col gap-2">
        <SmallCalendar setDate={setDate} date={date ?? new Date()} inView btn />
        <ListEvents items={events} />
      </div>
      <CalendarInfo
        events={events}
        setEvents={setEvents}
        loadingEvents={loadingEvents}
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
