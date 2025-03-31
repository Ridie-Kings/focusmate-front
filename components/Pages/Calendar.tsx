"use client";

import CalendarInfo from "@/components/Elements/Pages/Calendar/CalendarInfo";
import Categories from "@/components/Elements/Pages/Calendar/Categories";
import Calendar from "@/components/Elements/General/Calendar";
import { useContext, useState } from "react";
import { CalendarContext } from "../Provider/CalendarProvider";

export default function CalendarPage() {
  const storedCalendar = localStorage.getItem("navCalendar") ?? "Day";
  const [navType, setNavType] = useState<string>(storedCalendar);
  const { date, setDate } = useContext(CalendarContext);

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
        <Categories inView={navType !== "Month"} />
      </div>
      <CalendarInfo
        navType={navType}
        setNavType={setNavType}
        date={date}
        setDate={setDate}
      />
    </section>
  );
}
