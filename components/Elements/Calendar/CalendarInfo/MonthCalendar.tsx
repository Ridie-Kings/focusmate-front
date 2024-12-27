import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "path";
import { useState } from "react";

const CalendarItem = ({ date }: { date: Date }) => {
  const startDate = startOfWeek(startOfMonth(date), { locale: es });
  const endDate = endOfWeek(endOfMonth(date), { locale: es });

  const days = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  const isToday = (day: Date) => isSameDay(day, new Date());

  return (
    <div className="grid grid-cols-7 w-full h-full border rounded-xl overflow-hidden">
      {days.map((day, index) => (
        <div
          key={index}
          className={`text-center pt-1 h-full cursor-pointer border ${
            day.getMonth() === date.getMonth() ? "text-black" : "text-gray-400"
          } ${
            isToday(day)
              ? "bg-black-100 text-white-100"
              : "hover:bg-black-100/80 hover:text-white-100"
          }`}
        >
          {day.getDate()}
        </div>
      ))}
    </div>
  );
};

export default function MonthCalendar() {
  const [date, setDate] = useState<Date>(new Date());

  const handlePreviousMonth = () => {
    setDate(subMonths(date, 1));
  };

  const handleNextMonth = () => {
    setDate(addMonths(date, 1));
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(date);
    newDate.setFullYear(parseInt(year));
    setDate(newDate);
  };

  const years = Array.from(
    { length: 2 },
    (_, i) => new Date().getFullYear() + i
  );
  return (
    <div className="w-full flex-1 flex flex-col gap-2 place-content-between py-2 ">
      <ul className="grid grid-cols-7 gap-1">
        {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((day, index) => (
          <div
            key={index}
            className="text-sm font-medium uppercase text-gray-500 text-center py-2 border-2 rounded-lg"
          >
            {day}
          </div>
        ))}
      </ul>
      <CalendarItem date={date} />
    </div>
  );
}
