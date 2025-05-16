import { TaskType } from "@/interfaces/Task/TaskType";
import { isSameDay } from "date-fns";
import { Dispatch, SetStateAction } from "react";

interface DaysCalendarProps {
  isToday: (day: Date) => boolean;
  date: Date | undefined;
  days: Date[];
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  events?: TaskType[];
}

export default function DaysCalendar({
  isToday,
  date,
  days,
  setDate,
  events,
}: DaysCalendarProps) {
  const currentMonth = date?.getMonth();

  const getDayClasses = (day: Date) => {
    const isCurrentMonth = day.getMonth() === currentMonth;
    const isTodayDay = isToday(day);
    const isSelected = date && isSameDay(day, date);

    const baseClasses =
      "text-center size-10 flex flex-col items-center justify-center rounded-full text-sm cursor-pointer transition-colors duration-200";
    const monthClasses = isCurrentMonth ? "text-black" : "text-gray-400";
    const todayClasses = isTodayDay
      ? "border border-secondary-700 text-secondary-700 hover:bg-secondary-700/25"
      : "hover:bg-secondary-600 hover:text-white";
    const selectedClasses = isSelected ? "bg-secondary-700 text-white" : "";

    return `${todayClasses} ${baseClasses} ${monthClasses} ${selectedClasses}`;
  };

  const handleDayClick = (day: Date) => {
    if (isToday(day) && date) {
      setDate(undefined);
    } else {
      if (!isSameDay(date ?? new Date(), day)) setDate(day);
    }
  };

  const getEventsForDay = (day: Date) => {
    return (
      events &&
      events.filter(
        (event) => event.dueDate && isSameDay(new Date(event.dueDate), day)
      )
    );
  };

  return (
    <div className="grid grid-cols-7 justify-items-center space-x-1 h-[264px] space-y-1">
      {days.map((day) => {
        const dayEvents = getEventsForDay(day);
        const hasEvents = dayEvents && dayEvents.length > 0;

        return (
          <div
            key={`day-${day.toISOString()}`}
            className={getDayClasses(day)}
            onClick={() => handleDayClick(day)}
            aria-selected={date && isSameDay(day, date)}
            role="gridcell"
          >
            <div>{day.getDate()}</div>

            {events && hasEvents && (
              <div className="flex mt-1 space-x-0.5">
                {dayEvents.length <= 3 ? (
                  Array.from({ length: dayEvents.length }).map((_, i) => (
                    <div
                      key={`event-dot-${i}`}
                      className="size-1.5 rounded-full bg-secondary-700"
                    />
                  ))
                ) : (
                  <>
                    <div className="size-1.5 rounded-full bg-secondary-700" />
                    <div className="size-1.5 rounded-full bg-secondary-700" />
                    <div className="size-1.5 rounded-full bg-secondary-700" />
                    <div className="text-xs font-bold text-secondary-700 -mt-0.5">
                      +
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
