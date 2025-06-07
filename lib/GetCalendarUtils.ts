"use client";
import { getCalendarByDate } from "@/services/Calendar/getCalendarByDate";
import { getCalendarByRange } from "@/services/Calendar/getCalendarByRange";
import { getCalendarOfMonthByDate } from "@/services/Calendar/getCalendarOfMonthByDate";
import { format, isSameMonth } from "date-fns";
import { DashboardStore, useDashboardStore } from "@/stores/dashboardStore";
import { useDate } from "@/stores/calendarStore";

export default function CalendarUtils({
  firstDate,
  secondDate,
  setCurrentMonth,
  setLoading,
  currentMonth,
}: {
  firstDate: Date;
  secondDate: Date;
  setCurrentMonth: (month: Date) => void;
  setLoading: (key: keyof DashboardStore["loading"], value: boolean) => void;
  currentMonth: Date | undefined;
}) {
  const { setCalendar } = useDashboardStore((state) => state.actions);
  const date = useDate();

  const handleGetCalendarByRange = async () => {
    try {
      const event = await getCalendarByRange({ firstDate, secondDate });
      if (event.success) {
        setCalendar(event.res);
      } else {
        console.error("Error al obtener el calendario client", event.res);
        setCalendar({ events: [], tasks: [] });
      }
    } catch (error) {
      console.error("Error al obtener el calendario server", error);

      setCalendar({ events: [], tasks: [] });
    }
  };

  const handleGetCalendarByDate = async () => {
    try {
      const event = await getCalendarByDate({
        date: format(date ?? new Date(), "yyyy-MM-dd"),
      });

      if (event.success) {
        setCalendar(event.res);
      } else {
        console.error("Error al obtener el calendario client", event.res);
        setCalendar({ events: [], tasks: [] });
      }
    } catch (error) {
      console.error("Error al obtener el calendario server", error);
      setCalendar({ events: [], tasks: [] });
    }
  };

  const handleGetCalendarOfMonthByDate = async (dateToFetch: Date) => {
    setLoading("calendar", true);

    try {
      const calendar = await getCalendarOfMonthByDate({
        date: dateToFetch,
      });

      if (calendar.success) {
        setCalendar(calendar.res);

        if (
          !currentMonth ||
          !isSameMonth(dateToFetch, currentMonth ?? new Date())
        )
          setCurrentMonth(dateToFetch);
      }
    } catch (error) {
      console.error("Error al obtener el calendario", error);

      setCalendar({ events: [], tasks: [] });
    } finally {
      setLoading("calendar", false);
    }
  };

  return {
    handleGetCalendarByRange,
    handleGetCalendarByDate,
    handleGetCalendarOfMonthByDate,
  };
}
