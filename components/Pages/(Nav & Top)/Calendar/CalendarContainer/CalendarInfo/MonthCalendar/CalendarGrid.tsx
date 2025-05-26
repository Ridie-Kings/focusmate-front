import { TaskType } from "@/interfaces/Task/TaskType";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { es } from "date-fns/locale";
import { Dispatch, memo, SetStateAction, useMemo } from "react";
import CalendarDay from "./CalendarGrid/CalendarDay";
import { NavTypeType } from "@/interfaces/Calendar/CalendarType";

const CalendarGrid = memo(
  ({
    events,
    date = new Date(),
    setDate,
    setNavType,
  }: {
    events: TaskType[];
    date?: Date;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
    setNavType: Dispatch<SetStateAction<NavTypeType>>;
  }) => {
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
            setNavType={setNavType}
            setDate={setDate}
          />
        ))}
      </div>
    );
  }
);

CalendarGrid.displayName = "CalendarGrid";

export default CalendarGrid;
