"use client";

import CalendarInfo from "@/components/Pages/(Nav & Top)/Calendar/CalendarContainer/CalendarInfo";
import { useState, useEffect } from "react";
import { useDate } from "@/stores/calendarStore";
import SmallCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";

import { isSameMonth } from "date-fns";

import getCalendarUtils from "@/lib/GetCalendarUtils";
import { NavTypeType } from "@/interfaces/Calendar/CalendarType";
import ListEvents from "./Calendar/CalendarContainer/ListEvents";
import { useDashboardStore } from "@/stores/dashboardStore";

export default function CalendarPage() {
  const { setLoading, setCalendar } = useDashboardStore(
    (state) => state.actions
  );

  const date = useDate();

  const [navType, setNavType] = useState<NavTypeType>("Día");
  const [currentMonth, setCurrentMonth] = useState<Date | undefined>(undefined);

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

    const { handleGetCalendarOfMonthByDate } = getCalendarUtils({
      firstDate: date ?? new Date(),
      secondDate: date ?? new Date(),
      date,
      setCurrentMonth,
      setCalendar,
      setLoading,
      currentMonth,
    });

    handleGetCalendarOfMonthByDate(date ?? new Date());
  }, [date, navType]);

  return (
    <section className="flex sm:flex-row flex-col flex-1 max-h-screen sm:gap-6 p-6 overflow-hidden transition-all duration-300">
      <div className="w-full sm:w-1/3 xl:w-1/4 2xl:w-1/5 flex flex-col gap-2">
        <SmallCalendar date={date ?? new Date()} inView btn />
        <ListEvents navType={navType} />
      </div>
      <CalendarInfo
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
      />
    </section>
  );
}
