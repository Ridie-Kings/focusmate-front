import { TaskType } from "@/interfaces/Task/TaskType";
import CalendarGrid from "./MonthCalendar/CalendarGrid";
import { Dispatch, SetStateAction } from "react";
import { NavTypeType } from "../../../Calendar";

export default function MonthCalendar({
  events,
  date = new Date(),
  setDate,
  setNavType,
}: {
  events: TaskType[];
  date?: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  setNavType: Dispatch<SetStateAction<NavTypeType>>;
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

      <CalendarGrid
        date={date}
        events={events}
        setDate={setDate}
        setNavType={setNavType}
      />
    </div>
  );
}
