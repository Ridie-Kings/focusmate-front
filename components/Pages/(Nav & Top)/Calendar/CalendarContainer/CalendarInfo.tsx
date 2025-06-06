"use client";
import NavInfo from "./CalendarInfo/NavInfo";
import DayCalender from "./CalendarInfo/DayCalendar";
import WeekCalendar from "./CalendarInfo/WeekCalendar";
import MonthCalendar from "./CalendarInfo/MonthCalendar";
import { Dispatch, SetStateAction, useRef } from "react";
import { TaskType } from "@/interfaces/Task/TaskType";
import { NavTypeType } from "@/interfaces/Calendar/CalendarType";
import LoadingState from "@/components/Elements/General/LoadingState";

export default function CalendarInfo({
  navType,
  setNavType,
  date,
  setDate,
  events,
  loadingEvents,
}: {
  navType: NavTypeType;
  setNavType: Dispatch<SetStateAction<NavTypeType>>;
  date: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  events: TaskType[];
  loadingEvents: boolean;
}) {
  const scrollCalendar = useRef<HTMLDivElement>(null);

  const renderCalenderType = () => {
    if (loadingEvents) return <LoadingState />;
    switch (navType) {
      case "Día":
        return <DayCalender events={events} date={date} />;
      case "Semana":
        return (
          <WeekCalendar
            events={events}
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
