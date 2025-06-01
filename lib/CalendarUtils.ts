import { TaskType } from "@/interfaces/Task/TaskType";
import { getCalendarByDate } from "@/services/Calendar/getCalendarByDate";
import { getCalendarByRange } from "@/services/Calendar/getCalendarByRange";
import { getCalendarOfMonthByDate } from "@/services/Calendar/getCalendarOfMonthByDate";
import { format, isSameMonth } from "date-fns";

export default function CalendarUtils({
  firstDate,
  secondDate,
  date,
  setEvents,
  setCurrentMonth,
  setLoadingEvents,
  currentMonth,
}: {
  firstDate: Date;
  secondDate: Date;
  date: Date | undefined;
  setEvents: (events: TaskType[]) => void;
  setCurrentMonth: (month: Date) => void;
  setLoadingEvents: (loading: boolean) => void;
  currentMonth: Date | undefined;
}) {
  const handleGetCalendarByRange = async () => {
    try {
      const event = await getCalendarByRange({ firstDate, secondDate });
      if (event.success) {
        setEvents(event.res);
      } else {
        console.error("Error al obtener el calendario client", event.res);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error al obtener el calendario server", error);

      setEvents([]);
    }
  };

  const handleGetCalendarByDate = async () => {
    try {
      const event = await getCalendarByDate({
        date: format(date ?? new Date(), "yyyy-MM-dd"),
      });

      if (event.success) {
        setEvents(event.res);
      } else {
        console.error("Error al obtener el calendario client", event.res);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error al obtener el calendario server", error);
      setEvents([]);
    }
  };

  const handleGetCalendarOfMonthByDate = async (dateToFetch: Date) => {
    setLoadingEvents(true);

    try {
      const events = await getCalendarOfMonthByDate({
        date: dateToFetch,
      });

      if (events.success) {
        setEvents(events.res);

        if (!isSameMonth(dateToFetch, currentMonth ?? new Date()))
          setCurrentMonth(dateToFetch);
      }
    } catch (error) {
      console.error("Error al obtener el calendario", error);

      setEvents([]);
    } finally {
      setLoadingEvents(false);
    }
  };

  return {
    handleGetCalendarByRange,
    handleGetCalendarByDate,
    handleGetCalendarOfMonthByDate,
  };
}
