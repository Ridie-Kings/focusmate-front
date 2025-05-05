import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { es } from "date-fns/locale";

import { memo, useMemo } from "react";

import Dot from "@/components/Elements/General/Dot";
import { TaskType } from "@/interfaces/Task/TaskType";

interface CalendarDayProps {
  day: Date;
  currentMonth: number;
  events: TaskType[];
}

const CalendarDay = memo(({ day, currentMonth, events }: CalendarDayProps) => {
  const isToday = isSameDay(day, new Date());
  const isCurrentMonth = day.getMonth() === currentMonth;
  const dayEvents = useMemo(
    () => events.filter((event) => isSameDay(new Date(event.startDate), day)),
    [events, day]
  );

  const visibleEvents = dayEvents.slice(0, 2);
  const remainingCount = dayEvents.length > 2 ? dayEvents.length - 2 : 0;

  return (
    <div
      className={`text-center p-2 h-full cursor-pointer border border-primary-200 relative transition-all duration-300
        ${isCurrentMonth ? "text-black" : "text-gray-400"}
        ${
          isToday
            ? "bg-primary-400 text-white"
            : "hover:bg-secondary-600 hover:text-white"
        }`}
      aria-label={format(day, "EEEE, d MMMM yyyy", { locale: es })}
    >
      {day.getDate()}
      <div className="text-xs">
        {visibleEvents.map((event, i) => (
          <div
            key={`${i}-${day.toISOString()}`}
            className={`p-1 rounded flex flex-col ${
              isSameDay(new Date(event.dueDate), new Date())
                ? "text-white"
                : "text-primary-500"
            }`}
            title={event.title}
          >
            <div className="flex items-center gap-2 truncate">
              <Dot
                size={10}
                backgroundColor={
                  isSameDay(new Date(event.dueDate), new Date())
                    ? "white"
                    : "#014e44"
                }
              />
              {event.title}
            </div>
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="flex items-center justify-center text- gap-1 mt-1">
            <span>+{remainingCount} Tareas</span>
          </div>
        )}
      </div>
    </div>
  );
});

CalendarDay.displayName = "CalendarDay";

const CalendarGrid = memo(
  ({ date, events }: { date: Date; events: TaskType[] }) => {
    const currentMonth = date.getMonth();

    const days = useMemo(() => {
      const startDate = startOfWeek(startOfMonth(date), { locale: es });
      const endDate = endOfWeek(endOfMonth(date), { locale: es });

      const daysArray = [];
      let currentDate = startDate;

      while (currentDate <= endDate) {
        daysArray.push(currentDate);
        currentDate = addDays(currentDate, 1);
      }

      return daysArray;
    }, [date]);

    return (
      <div className="grid grid-cols-7 w-full h-full border border-primary-200 overflow-hidden min-h-[500px]">
        {days.map((day) => (
          <CalendarDay
            key={day.toISOString()}
            day={day}
            currentMonth={currentMonth}
            events={events}
          />
        ))}
      </div>
    );
  }
);

CalendarGrid.displayName = "CalendarGrid";

export default function MonthCalendar({
  events,
  date = new Date(),
}: {
  events: TaskType[];
  date?: Date;
}) {
  const weekdays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="w-full flex-1 flex flex-col gap-4 place-content-between">
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((day) => (
          <div
            key={day}
            className="relative text-xl text-center py-2 rounded-lg bg-primary-400 text-white"
          >
            {day}
          </div>
        ))}
      </div>

      <CalendarGrid date={date} events={events} />
    </div>
  );
}
