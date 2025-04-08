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
import Button from "@/components/Reusable/Button";
import WeekDays from "./Calendar/WeekDays";
import DaysCalendar from "./Calendar/DaysCalendar";
import CalendarNav from "./Calendar/CalendarNav";
import { createEventCalendar } from "@/services/Calendar/createEventCalendar";

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

interface CalendarItemProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

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

interface CalendarProps {
  className?: string;
  inView?: boolean;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  date: Date | undefined;
  btn?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  className = "",
  inView,
  setDate,
  date,
  btn,
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

  const handleCreateEvent = async () => {
    const res = await createEventCalendar();
    if (res) {
      console.log("Evento creado:", res);
    } else {
      console.error("Error al crear el evento");
    }
  };

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
      {btn && (
        <Button onClick={handleCreateEvent} button="tertiary" type="button">
          Nuevo Evento
        </Button>
      )}
    </div>
  );
};

export default Calendar;
