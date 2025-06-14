import { isSameDay, isSameMonth, isSameWeek } from "date-fns";

import { useMemo } from "react";

import { useCalendar } from "@/stores/dashboardStore";
import { useDate } from "@/stores/calendarStore";
import { TimelineItem } from "@/components/Elements/Calendar/Timeline/TimelineCard";

export default function CalendarUtils({
  navType,
}: {
  navType: "day" | "week" | "month";
}) {
  const calendar = useCalendar();
  const date = useDate();

  const formatCalendar = useMemo(() => {
    const events: TimelineItem[] = calendar.events
      .filter((event) => {
        if (navType === "day") {
          return isSameDay(new Date(event.startDate), date ?? new Date());
        } else if (navType === "week") {
          return isSameWeek(new Date(event.startDate), date ?? new Date());
        } else {
          return isSameMonth(new Date(event.startDate), date ?? new Date());
        }
      })
      .map((event) => ({
        type: "event",
        data: event,
        startDate: new Date(event.startDate),
      }));

    const tasks: TimelineItem[] = calendar.tasks
      .filter((task) =>
        navType === "day"
          ? isSameDay(new Date(task.dueDate), date ?? new Date())
          : navType === "week"
          ? isSameWeek(new Date(task.dueDate), date ?? new Date())
          : isSameMonth(new Date(task.dueDate), date ?? new Date())
      )
      .map((task) => ({
        type: "task",
        data: task,
        startDate: new Date(task.dueDate),
      }));

    return [...events, ...tasks].sort(
      (a, b) => a.startDate.getTime() - b.startDate.getTime()
    );
  }, [date, calendar.events, calendar.tasks, navType]);

  return {
    formatCalendar,
  };
}
