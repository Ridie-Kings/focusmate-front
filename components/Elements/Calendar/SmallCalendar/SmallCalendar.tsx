"use client";

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  format,
  addMonths,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import WeekDays from "@/components/Elements/Calendar/SmallCalendar/SmallCalendarComponents/WeekDays";
import DaysCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendarComponents/DaysCalendar";
import CalendarNav from "@/components/Elements/Calendar/SmallCalendar/SmallCalendarComponents/CalendarNav";
import Button from "@/components/Reusable/Button";
import { ModalContext } from "@/components/Provider/ModalProvider";
import { TaskType } from "@/interfaces/Task/TaskType";
import { getCalendarByRange } from "@/services/Calendar/getCalendarByRange";

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
  events?: TaskType[];
};

export const CalendarItem: React.FC<CalendarItemProps> = ({
  date,
  setDate,
  events,
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
        events={events}
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
  eventos?: boolean;
};

const SmallCalendar: React.FC<CalendarProps> = ({
  className = "",
  inView,
  setDate,
  date,
  btn,
  eventos,
}) => {
  const [events, setEvents] = useState<TaskType[]>();
  const { setIsOpen } = useContext(ModalContext);

  const handlePreviousMonth = () => {
    setDate(subMonths(date, 1));
  };
  const handleNextMonth = () => {
    setDate(addMonths(date, 1));
  };

  useEffect(() => {
    if (!eventos) return;

    const firstDate = startOfWeek(startOfMonth(date ?? new Date()));
    const secondDate = endOfWeek(endOfMonth(date ?? new Date()));

    const handleGetCalendarByRange = async () => {
      const event = await getCalendarByRange({ firstDate, secondDate });

      if (event.success) {
        setEvents(event.res);
      } else {
        console.error("Error al obtener el calendario", event.res);
        setEvents([]);
      }
    };

    handleGetCalendarByRange();
  }, []);

  const handleMonthYearChange = (monthYear: string) => {
    setDate((currentDate) => {
      const [month, year] = monthYear.split(" ");

      const monthNames = Array.from({ length: 12 }, (_, i) =>
        format(new Date(2000, i, 1), "MMMM")
      );
      const monthIndex = monthNames.at(parseInt(month));

      const newDate = new Date(currentDate ?? new Date());
      newDate.setMonth(monthNames.findIndex((e) => e === monthIndex));
      newDate.setFullYear(parseInt(year));
      return newDate;
    });
  };

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
        />
        <CalendarItem date={date} setDate={setDate} events={events} />
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
