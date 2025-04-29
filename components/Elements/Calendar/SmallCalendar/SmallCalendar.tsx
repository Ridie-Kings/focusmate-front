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
  format,
} from "date-fns";
import { es } from "date-fns/locale";

import { Dispatch, SetStateAction, useContext } from "react";

import WeekDays from "@/components/Elements/Calendar/SmallCalendar/SmallCalendarComponents/WeekDays";
import DaysCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendarComponents/DaysCalendar";
import CalendarNav from "@/components/Elements/Calendar/SmallCalendar/SmallCalendarComponents/CalendarNav";
import Button from "@/components/Reusable/Button";
import { ModalContext } from "@/components/Provider/ModalProvider";

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

export const CalendarItem: React.FC<CalendarItemProps> = ({
  date,
  setDate,
}) => {
  const days = generateMonthDays(date);

  const isToday = (day: Date): boolean => isSameDay(day, new Date());

  return (
    <div className="flex flex-col gap-4 px-3">
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
  date: Date;
  btn?: boolean;
};

const SmallCalendar: React.FC<CalendarProps> = ({
  className = "",
  inView,
  setDate,
  date,
  btn,
}) => {
  const { setIsOpen } = useContext(ModalContext);

  const handlePreviousMonth = () => {
    setDate(subMonths(date, 1));
  };

  const handleNextMonth = () => {
    setDate(addMonths(date, 1));
  };

  const handleMonthYearChange = (monthYear: string) => {
    setDate((currentDate) => {
      console.log(monthYear);

      const [month, year] = monthYear.split(" ");

      const monthNames = Array.from({ length: 12 }, (_, i) =>
        format(new Date(2000, i, 1), "MMMM", { locale: es })
      );
      const monthIndex = monthNames.findIndex((m) => m === month);

      const newDate = new Date(currentDate ?? new Date());
      newDate.setMonth(monthIndex);
      newDate.setFullYear(parseInt(year));
      return newDate;
    });
  };

  const monthYearOptions = Array.from({ length: 24 }, (_, i) => {
    const monthDate = addMonths(new Date(), i);
    return format(monthDate, "MMMM yyyy", { locale: es });
  });

  return (
    <div className="flex flex-col place-content-between">
      <div
        className={`w-full flex flex-col py-2 overflow-hidden ${className} ${
          !inView && "hidden"
        } transition-all duration-300`}
      >
        <CalendarNav
          handleNextMonth={handleNextMonth}
          handlePreviousMonth={handlePreviousMonth}
          handleYearChange={handleMonthYearChange}
          date={date}
          years={monthYearOptions}
        />
        <CalendarItem date={date} setDate={setDate} />
      </div>
      {btn && (
        <Button
          size="large"
          onClick={() => setIsOpen({ text: "event", other: date })}
          button="tertiary"
          type="button"
        >
          Nuevo Evento
        </Button>
      )}
    </div>
  );
};

export default SmallCalendar;
