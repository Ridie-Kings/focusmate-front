import Dot from "@/components/Elements/General/Dot";
import { NavTypeType } from "@/interfaces/Calendar/CalendarType";

import { TaskType } from "@/interfaces/Task/TaskType";

import { format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";

import { Dispatch, memo, SetStateAction, useMemo } from "react";

type CalendarDayProps = {
  day: Date;
  currentMonth: number;
  events: TaskType[];
  setNavType: Dispatch<SetStateAction<NavTypeType>>;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
};

const CalendarDay = memo(
  ({ day, currentMonth, events, setDate, setNavType }: CalendarDayProps) => {
    const isToday = isSameDay(day, new Date());
    const isCurrentMonth = day.getMonth() === currentMonth;
    const dayEvents = useMemo(
      () => events.filter((event) => isSameDay(new Date(event.startDate), day)),
      [events, day]
    );

    const visibleEvents = dayEvents.slice(0, 2);
    const remainingCount = dayEvents.length > 2 ? dayEvents.length - 2 : 0;

    const handleSelectDay = () => {
      setDate(day);
      setNavType("Día");
    };

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
        onClick={handleSelectDay}
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
  }
);

CalendarDay.displayName = "CalendarDay";

export default CalendarDay;
