"use client";
import NavInfo from "./CalendarInfo/NavInfo";
import DayCalender from "./CalendarInfo/DayCalendar";
import WeekCalendar from "./CalendarInfo/WeekCalendar";
import MonthCalendar from "./CalendarInfo/MonthCalendar";
import { Dispatch, SetStateAction } from "react";
import { TaskType } from "@/interfaces/Task/TaskType";

export default function CalendarInfo({
  navType,
  setNavType,
  date,
  setDate,
  events,
}: {
  navType: string;
  setNavType: Dispatch<SetStateAction<string>>;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  events: TaskType[];
}) {
  console.log(events);

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
