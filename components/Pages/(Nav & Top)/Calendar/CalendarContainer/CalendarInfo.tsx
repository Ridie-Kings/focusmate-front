"use client";
import NavInfo from "./CalendarInfo/NavInfo";
import DayCalender from "./CalendarInfo/DayCalendar";
import WeekCalendar from "./CalendarInfo/WeekCalendar";
import MonthCalendar from "./CalendarInfo/MonthCalendar";
import { Dispatch, SetStateAction } from "react";
import { NavTypeType } from "@/interfaces/Calendar/CalendarType";
import LoadingState from "@/components/Elements/General/LoadingState";
import { useLoadingCalendar } from "@/stores/dashboardStore";

export default function CalendarInfo({
  navType,
  setNavType,
}: {
  navType: NavTypeType;
  setNavType: Dispatch<SetStateAction<NavTypeType>>;
}) {
  const loadingCalendar = useLoadingCalendar();


  const renderCalenderType = () => {
    if (loadingCalendar) return <LoadingState />;

    switch (navType) {
      case "Día":
        return <DayCalender />;
      case "Semana":
        return <WeekCalendar />;
      case "Mes":
        return <MonthCalendar setNavType={setNavType} />;
      default:
        return <MonthCalendar setNavType={setNavType} />;
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-10 sm:gap-0">
      <NavInfo navType={navType} setNavType={setNavType} />
      {renderCalenderType()}
    </div>
  );
}
