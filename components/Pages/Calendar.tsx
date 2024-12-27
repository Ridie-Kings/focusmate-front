"use client";
import CalendarInfo from "@/components/Elements/Calendar/CalendarInfo";
import Categories from "@/components/Elements/Calendar/Categories";
import Calendar from "@/components/Elements/General/Calendar";
import { useState } from "react";

export default function CalendarPage() {
  const [navType, setNavType] = useState("Month");

  return (
    <section className="flex flex-1 gap-4 p-4 overflow-hidden">
      <div className="2xl:w-1/4 w-1/3 h-full flex flex-col gap-2">
        <Calendar
          className="w-full border-2 rounded-lg p-2"
          inView={navType === "Month" ? false : true}
        />
        <Categories inView={navType === "Month" ? false : true} />
      </div>
      <CalendarInfo navType={navType} setNavType={setNavType} />
    </section>
  );
}
