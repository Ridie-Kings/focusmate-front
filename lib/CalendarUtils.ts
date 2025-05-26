import { TaskType } from "@/interfaces/Task/TaskType";
import { getCalendarByDate } from "@/services/Calendar/getCalendarByDate";
import { getCalendarByRange } from "@/services/Calendar/getCalendarByRange";
import { format } from "date-fns";

export default function CalendarUtils({
  firstDate,
  secondDate,
  date,
  setEvents,
}: {
  firstDate: Date;
  secondDate: Date;
  date: Date | undefined;
  setEvents: (events: TaskType[]) => void;
}) {
  const handleGetCalendarByRange = async () => {
    const event = await getCalendarByRange({ firstDate, secondDate });

    if (event.success) {
      setEvents(event.res);
    } else {
      console.error("Error al obtener el calendario", event.res);
      setEvents([]);
    }
  };

  const handleGetCalendarByDate = async () => {
    const event = await getCalendarByDate({
      date: format(date ?? new Date(), "yyyy-MM-dd"),
    });

    if (event.success) {
      setEvents(event.res);
    } else {
      console.error("Error al obtener el calendario", event.res);
      setEvents([]);
    }
  };

  return {
    handleGetCalendarByRange,
    handleGetCalendarByDate,
  };
}
