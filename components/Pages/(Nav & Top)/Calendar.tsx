"use client";

import CalendarInfo from "@/components/Pages/(Nav & Top)/Calendar/CalendarInfo";
import Categories from "@/components/Pages/(Nav & Top)/Calendar/Categories";
import Calendar from "@/components/Elements/General/Calendar";
import { useContext, useState, useEffect } from "react";
import { CalendarContext } from "../Provider/CalendarProvider";

export default function CalendarPage() {
  const [navType, setNavType] = useState<string>("Day");
  const { date, setDate } = useContext(CalendarContext);

  useEffect(() => {
    const storedCalendar = localStorage.getItem("navCalendar") || "Day";
    setNavType(storedCalendar);
  }, []);

  const updateNavType = (type: string): void => {
    setNavType(type);
    localStorage.setItem("navCalendar", type);
  };

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
        <Categories />
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
        date={date}
        setDate={setDate}
      />
    </section>
  );
}
