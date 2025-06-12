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

import { Dispatch, SetStateAction, useMemo } from "react";

import WeekDays from "@/components/Elements/Calendar/SmallCalendar/SmallCalendarComponents/WeekDays";
import DaysCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendarComponents/DaysCalendar";
import CalendarNav from "@/components/Elements/Calendar/SmallCalendar/SmallCalendarComponents/CalendarNav";
import Button from "@/components/Reusable/Button";
import { useModalStore } from "@/stores/modalStore";
import { useTranslations } from "next-intl";
import { useCalendar } from "@/stores/dashboardStore";
import { TimelineItem } from "../Timeline/TimelineCard";
import { useCalendarStore } from "@/stores/calendarStore";

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
  date: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  calendar?: TimelineItem[];
};

export const CalendarItem: React.FC<CalendarItemProps> = ({
  date,
  setDate,
  calendar,
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
        calendar={calendar}
      />
    </div>
  );
};

type CalendarProps = {
  className?: string;
  inView?: boolean;
  date: Date;
  btn?: boolean;
};

const SmallCalendar: React.FC<CalendarProps> = ({
  className = "",
  inView,
  date,
  btn,
}) => {
  const { setDate } = useCalendarStore((state) => state.actions);
  const calendar = useCalendar();
  const { setIsOpen } = useModalStore((state) => state.actions);
  const t = useTranslations("Common.buttons");

  const handlePreviousMonth = () => {
    setDate(subMonths(date, 1));
  };
  const handleNextMonth = () => {
    setDate(addMonths(date, 1));
  };

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

  const timelineItems = useMemo(() => {
    const events: TimelineItem[] = calendar.events.map((event) => ({
      type: "event",
      data: event,
      startDate: new Date(event.startDate),
    }));

    const tasks: TimelineItem[] = calendar.tasks.map((task) => ({
      type: "task",
      data: task,
      startDate: new Date(task.dueDate),
    }));

    return [...events, ...tasks].sort(
      (a, b) => a.startDate.getTime() - b.startDate.getTime()
    );
  }, [date, calendar.events, calendar.tasks]);

  return (
    <div
      className="flex flex-col place-content-between pb-2"
      id="small-calendar-component"
    >
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
        <CalendarItem date={date} setDate={setDate} calendar={timelineItems} />
      </div>
      {btn && (
        <Button
          size="large"
          onClick={() => setIsOpen({ text: "event", other: date })}
          button="tertiary"
          type="button"
        >
          {t("newEvent")}
        </Button>
      )}
    </div>
  );
};

export default SmallCalendar;
