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
  return (
    <div className="grid grid-cols-7 space-y-4 space-x-1">
      {days.map((day, index) => (
        <div
          key={index}
          className={`text-center py-1 px-2.5 rounded text-sm cursor-pointer ${
            date && day.getMonth() === date.getMonth()
              ? "text-black"
              : "text-gray-400"
          } ${
            isToday(day)
              ? "bg-primary-500 text-white-100"
              : "hover:bg-secondary-700-hover hover:text-white-100"
          } ${
            date && isSameDay(day, date) && "bg-secondary-700 text-white-100"
          }`}
          onClick={() => setDate(isToday(day) ? undefined : day)}
        >
          {day.getDate()}
        </div>
      ))}
    </div>
  );
}
