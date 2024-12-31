"use client";
import NavInfo from "./CalendarInfo/NavInfo";
import DayCalender from "./CalendarInfo/DayCalendar";
import WeekCalendar from "./CalendarInfo/WeekCalendar";
import MonthCalendar from "./CalendarInfo/MonthCalendar";
import { useState } from "react";
import { EventType } from "@/services/interfaces/Calendar/EventType";

export default function CalendarInfo({
  navType,
  setNavType,
}: {
  navType: string;
  setNavType: (navType: string) => void;
}) {
  const [events] = useState<EventType[]>([
    {
      date: {
        start: new Date("Decembre 28, 2024 18:37:00"),
        end: new Date("Decembre 28, 2024 20:00:00"),
      },
      title: "calla bobo",
    },
    {
      date: {
        start: new Date("Decembre 31, 2024 08:37:00"),
        end: new Date("Decembre 31, 2024 10:00:00"),
      },
      title: "31",
    },
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
