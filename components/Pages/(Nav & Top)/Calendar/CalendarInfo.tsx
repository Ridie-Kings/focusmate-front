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
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) {
  const [events] = useState<EventType[]>([
    {
      date: {
        start: new Date("April 03, 2025 18:37:00"),
        end: new Date("April 03, 2025 20:00:00"),
      },
      title: "calla bobo",
    },
    {
      date: {
        start: new Date("April 03, 2025 08:37:00"),
        end: new Date("April 03, 2025 10:00:00"),
      },
      title: "31",
    },

    {
      date: {
        start: new Date("April 03, 2025 13:37:00"),
        end: new Date("April 03, 2025 16:00:00"),
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
    <div className="flex flex-col flex-1">
      <NavInfo navType={navType} setNavType={setNavType} />
      {renderCalenderType()}
    </div>
  );
}
