"use client";
import NavInfo from "./CalendarInfo/NavInfo";
import DayCalender from "./CalendarInfo/DayCalendar";
import WeekCalendar from "./CalendarInfo/WeekCalendar";
import MonthCalendar from "./CalendarInfo/MonthCalendar";
import { useState } from "react";
import { addDays } from "date-fns";
import { EventType } from "@/services/interfaces/Calendar/EventType";

export default function CalendarInfo({
  navType,
  setNavType,
}: {
  navType: string;
  setNavType: (navType: string) => void;
}) {
  const [events] = useState<EventType[]>([
    { date: new Date("Decembre 28, 2024 10:13:00"), title: "Réunion" },
    { date: addDays(new Date(), 1), title: "Déjeuner" },
  ]);

  const renderCalenderType = () => {
    switch (navType) {
      case "Day":
        return <DayCalender events={events} />;
      case "Week":
        return <WeekCalendar events={events} />;
      case "Month":
        return <MonthCalendar events={events} />;
      default:
        return <MonthCalendar events={events} />;
    }
  };
  return (
    <div className="flex flex-col w-full">
      <NavInfo navType={navType} setNavType={setNavType} />
      {renderCalenderType()}
    </div>
  );
}
