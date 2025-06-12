import Dot from "@/components/Elements/General/Dot";
import { NavTypeType } from "@/interfaces/Calendar/CalendarType";
import CalendarUtils from "@/lib/CalendarUtils";
import { useCalendarStore } from "@/stores/calendarStore";

import { format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";

import { Dispatch, memo, SetStateAction, useMemo } from "react";

type CalendarDayProps = {
  day: Date;
  currentMonth: number;
  setNavType: Dispatch<SetStateAction<NavTypeType>>;
};

const CalendarDay = memo(
  ({ day, currentMonth, setNavType }: CalendarDayProps) => {
    const { formatCalendar } = CalendarUtils({ navType: "day" });
    const { setDate } = useCalendarStore((state) => state.actions);

    const isToday = isSameDay(day, new Date());
    const isCurrentMonth = day.getMonth() === currentMonth;
    const dayCalendarItems = useMemo(
      () =>
        formatCalendar.filter((calendarItem) =>
          isSameDay(new Date(calendarItem.data.startDate), day)
        ),
      [formatCalendar, day]
    );

    const visibleCalendarItems = dayCalendarItems.slice(0, 2);
    const remainingCount =
      dayCalendarItems.length > 2 ? dayCalendarItems.length - 2 : 0;

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
          {visibleCalendarItems.map((calendarItem, i) => (
            <div
              key={`${i}-${day.toISOString()}`}
              className={`p-1 rounded flex flex-col ${
                isSameDay(new Date(calendarItem.data.startDate), new Date())
                  ? "text-white"
                  : "text-primary-500"
              }`}
              title={calendarItem.data.title}
            >
              <div className="flex items-center gap-2 truncate">
                <Dot
                  size={10}
                  backgroundColor={
                    isSameDay(new Date(calendarItem.data.startDate), new Date())
                      ? "white"
                      : "#014e44"
                  }
                />
                {calendarItem.data.title}
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
