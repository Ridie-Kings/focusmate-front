"use client";
import NavInfo from "./CalendarInfo/NavInfo";
import DayCalender from "./CalendarInfo/DayCalendar";
import WeekCalendar from "./CalendarInfo/WeekCalendar";
import MonthCalendar from "./CalendarInfo/MonthCalendar";
import { Dispatch, SetStateAction, useRef } from "react";
import { TaskType } from "@/interfaces/Task/TaskType";
import { NavTypeType } from "@/interfaces/Calendar/CalendarType";

export default function CalendarInfo({
  navType,
  setNavType,
  date,
  setDate,
  events,
  setEvents,
}: {
  navType: NavTypeType;
  setNavType: Dispatch<SetStateAction<NavTypeType>>;
  date: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  events: TaskType[];
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
}) {
  const scrollCalendar = useRef<HTMLDivElement>(null);

  const renderCalenderType = () => {
    switch (navType) {
      case "Día":
        return (
          <DayCalender events={events} date={date} setEvents={setEvents} />
        );
      case "Semana":
        return (
          <WeekCalendar
            events={events}
            setEvents={setEvents}
            date={date}
            setDate={setDate}
            scrollCalendar={scrollCalendar}
          />
        );
      case "Mes":
        return (
          <MonthCalendar
            events={events}
            date={date}
            setNavType={setNavType}
            setDate={setDate}
          />
        );
      default:
        return (
          <MonthCalendar
            events={events}
            date={date}
            setNavType={setNavType}
            setDate={setDate}
          />
        );
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-10 sm:gap-0">
      <NavInfo
        navType={navType}
        setNavType={setNavType}
        setDate={setDate}
        date={date}
      />
      {renderCalenderType()}
    </div>
  );
}
