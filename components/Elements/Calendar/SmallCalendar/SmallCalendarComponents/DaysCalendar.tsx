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
    <div className="grid grid-cols-7 space-y-1.5 space-x-0.5">
      {days.map((day, index) => (
        <div
          key={index}
          className={`text-center size-10 flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors duration-200 ${
            date && day.getMonth() === date.getMonth()
              ? "text-black"
              : "text-gray-400"
          } ${
            isToday(day)
              ? "bg-primary-green text-white-100"
              : "hover:bg-secondary-green-hover hover:text-white-100"
          } ${
            date && isSameDay(day, date) && "bg-secondary-green text-white-100"
          }`}
          onClick={() => setDate(isToday(day) ? undefined : day)}
        >
          {day.getDate()}
        </div>
      ))}
    </div>
  );
}
