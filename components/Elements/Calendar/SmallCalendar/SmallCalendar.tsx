"use client";

import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";

import { Dispatch, SetStateAction } from "react";

import WeekDays from "@/components/Elements/Calendar/SmallCalendar/SmallCalendarComponents/WeekDays";
import DaysCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendarComponents/DaysCalendar";
import CalendarNav from "@/components/Elements/Calendar/SmallCalendar/SmallCalendarComponents/CalendarNav";

const generateMonthDays = (date: Date | undefined): Date[] => {
  const safeDate = date || new Date();

  const startDate = startOfWeek(startOfMonth(safeDate), { locale: es });
  const endDate = endOfWeek(endOfMonth(safeDate), { locale: es });

  const days: Date[] = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return days;
};

type CalendarItemProps = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
};

const CalendarItem: React.FC<CalendarItemProps> = ({ date, setDate }) => {
  const days = generateMonthDays(date);

  const isToday = (day: Date): boolean => isSameDay(day, new Date());

  return (
    <div className="flex flex-col gap-4">
      <WeekDays />
      <DaysCalendar
        isToday={isToday}
        date={date}
        days={days}
        setDate={setDate}
      />
    </div>
  );
};

type CalendarProps = {
  className?: string;
  inView?: boolean;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  date: Date | undefined;
};

const SmallCalendar: React.FC<CalendarProps> = ({
  className = "",
  inView,
  setDate,
  date,
}) => {
  const handlePreviousMonth = () => {
    setDate(subMonths(date ?? new Date(), 1));
  };

  const handleNextMonth = () => {
    setDate(addMonths(date ?? new Date(), 1));
  };

  const handleYearChange = (year: string) => {
    setDate((currentDate) => {
      if (!currentDate) return undefined;
      const newDate = new Date(currentDate);
      newDate.setFullYear(parseInt(year));
      return newDate;
    });
  };

  const years = Array.from(
    { length: 2 },
    (_, i) => new Date().getFullYear() + i
  );

  return (
    <div
      className={`w-full h-full flex flex-col gap-4 py-2 overflow-hidden ${className} ${
        !inView && "hidden"
      } transition-all duration-300`}
    >
      <CalendarNav
        handleNextMonth={handleNextMonth}
        handlePreviousMonth={handlePreviousMonth}
        handleYearChange={handleYearChange}
        date={date}
        years={years}
      />
      <CalendarItem date={date} setDate={setDate} />
    </div>
  );
};

export default SmallCalendar;
