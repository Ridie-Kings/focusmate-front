"use client";
import NavInfo from "./CalendarInfo/NavInfo";
import DayCalender from "./CalendarInfo/DayCalendar";
import WeekCalendar from "./CalendarInfo/WeekCalendar";
import MonthCalendar from "./CalendarInfo/MonthCalendar";
import { Dispatch, SetStateAction, useState } from "react";
import { EventType } from "@/interfaces/Calendar/EventType";

export default function CalendarInfo({
  navType,
  setNavType,
  date,
  setDate,
}: {
  navType: string;
  setNavType: Dispatch<SetStateAction<string>>;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
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
        return <DayCalender events={events} date={date} setDate={setDate} />;
      case "Week":
        return <WeekCalendar events={events} date={date} setDate={setDate} />;
      case "Month":
        return <MonthCalendar events={events} date={date} setDate={setDate} />;
      default:
        return <MonthCalendar events={events} date={date} setDate={setDate} />;
    }
  };
  return (
    <div className="flex flex-col w-full">
      <NavInfo navType={navType} setNavType={setNavType} />
      {renderCalenderType()}
    </div>
  );
}
