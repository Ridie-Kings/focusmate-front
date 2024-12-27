import NavInfo from "./CalendarInfo/NavInfo";
import DayCalender from "./CalendarInfo/DayCalendar";
import WeekCalendar from "./CalendarInfo/WeekCalendar";
import MonthCalendar from "./CalendarInfo/MonthCalendar";

export default function CalendarInfo({
  navType,
  setNavType,
}: {
  navType: string;
  setNavType: (navType: string) => void;
}) {
  const renderCalenderType = () => {
    switch (navType) {
      case "Day":
        return <DayCalender />;
      case "Week":
        return <WeekCalendar />;
      case "Month":
        return <MonthCalendar />;
      default:
        return <MonthCalendar />;
    }
  };
  return (
    <div className="flex flex-col w-full">
      <NavInfo navType={navType} setNavType={setNavType} />
      {renderCalenderType()}
    </div>
  );
}
