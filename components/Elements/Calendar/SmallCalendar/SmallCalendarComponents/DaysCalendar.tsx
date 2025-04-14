import { isSameDay } from "date-fns";
import { Dispatch, SetStateAction } from "react";

interface DaysCalendarProps {
  isToday: (day: Date) => boolean;
  date: Date | undefined;
  days: Date[];
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

export default function DaysCalendar({
  isToday,
  date,
  days,
  setDate,
}: DaysCalendarProps) {
  const currentMonth = date?.getMonth();

  const getDayClasses = (day: Date) => {
    const isCurrentMonth = day.getMonth() === currentMonth;
    const isTodayDay = isToday(day);
    const isSelected = date && isSameDay(day, date);

    const baseClasses =
      "text-center size-10 flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors duration-200";
    const monthClasses = isCurrentMonth ? "text-black" : "text-gray-400";
    const todayClasses = isTodayDay
      ? "border border-secondary-700 text-secondary-700 hover:bg-secondary-700/25"
      : "hover:bg-secondary-600 hover:text-white";
    const selectedClasses = isSelected ? "bg-secondary-700 text-white" : "";

    return `${todayClasses} ${baseClasses}  ${monthClasses} ${selectedClasses}`;
  };

  const handleDayClick = (day: Date) => {
    if (isToday(day) && date) {
      setDate(undefined);
    } else {
      setDate(day);
    }
  };

  return (
    <div className="grid grid-cols-7">
      {days.map((day) => (
        <div
          key={`day-${day.toISOString()}`}
          className={getDayClasses(day)}
          onClick={() => handleDayClick(day)}
          aria-selected={date && isSameDay(day, date)}
          role="gridcell"
        >
          {day.getDate()}
        </div>
      ))}
    </div>
  );
}
