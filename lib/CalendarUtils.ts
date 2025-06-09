import { isSameDay } from "date-fns";

import { useMemo } from "react";

import { useCalendar } from "@/stores/dashboardStore";
import { useDate } from "@/stores/calendarStore";
import { TimelineItem } from "@/components/Elements/Calendar/Timeline/TimelineCard";

export default function CalendarUtils() {
  const calendar = useCalendar();
  const date = useDate();

  const formatCalendar = useMemo(() => {
    const events: TimelineItem[] = calendar.events
      .filter((event) =>
        isSameDay(new Date(event.startDate), date ?? new Date())
      )
      .map((event) => ({
        type: "event",
        data: event,
      }));

    const tasks: TimelineItem[] = calendar.tasks
      .filter((task) => isSameDay(new Date(task.dueDate), date ?? new Date()))
      .map((task) => ({
        type: "task",
        data: task,
      }));

    return [...events, ...tasks].sort(
      (a, b) => a.data.startDate.getTime() - b.data.startDate.getTime()
    );
  }, [date, calendar.events, calendar.tasks]);

  return {
    formatCalendar,
  };
}
