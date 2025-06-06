import TimeLeftBar from "@/components/Elements/Calendar/Timeline/TimeLeftBar";
import TimelineCard from "@/components/Elements/Calendar/Timeline/TimelineCard";
import LoadingStatus from "@/components/Elements/General/LoadingStatus";
import MountainAgenda from "@/components/Elements/Svg/Mountain/MountainAgenda";
import { useCalendar } from "@/stores/dashboardStore";
import { isSameDay } from "date-fns";
import { useTranslations } from "next-intl";
import { useMemo, useState, useEffect } from "react";
import { EventType } from "@/interfaces/Calendar/EventType";
import { TaskType } from "@/interfaces/Task/TaskType";

type TimelineItem = {
  type: "event" | "task";
  data: EventType | TaskType;
  startDate: Date;
};

interface TimelineProps {
  date: Date | undefined;
  loadingEvents: boolean;
}

export default function Timeline({ date, loadingEvents }: TimelineProps) {
  const calendar = useCalendar();

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const t = useTranslations("Dashboard.agenda.timeline");

  useEffect(() => {
    if (!loadingEvents && isInitialLoading) {
      setIsInitialLoading(false);
    }
  }, [loadingEvents, isInitialLoading]);

  const timelineItems = useMemo(() => {
    const events: TimelineItem[] = calendar.events
      .filter((event) =>
        isSameDay(new Date(event.startDate), date ?? new Date())
      )
      .map((event) => ({
        type: "event",
        data: event,
        startDate: new Date(event.startDate),
      }));

    const tasks: TimelineItem[] = calendar.tasks
      .filter((task) => isSameDay(new Date(task.dueDate), date ?? new Date()))
      .map((task) => ({
        type: "task",
        data: task,
        startDate: new Date(task.dueDate),
      }));

    return [...events, ...tasks].sort(
      (a, b) => a.startDate.getTime() - b.startDate.getTime()
    );
  }, [date, calendar.events, calendar.tasks]);

  return (
    <div
      id="timeline-component"
      className={`flex-1 ${
        timelineItems.length === 0 ? "" : "min-h-44 max-h-[500px]"
      } overflow-y-auto overflow-x-hidden flex flex-col gap-4 py-2`}
    >
      <p className="text-xl text-primary-500 text-center sticky top-0 bg-white">
        {t("title")}
      </p>
      <div className="flex flex-1 gap-4">
        {loadingEvents ? (
          <LoadingStatus text="eventos" />
        ) : (
          <>
            {timelineItems.length !== 0 ? (
              <>
                <TimeLeftBar filteredEvents={timelineItems} />
                <div className="flex-1 flex flex-col gap-2 pt-1.5">
                  {timelineItems.map((item, index) => (
                    <TimelineCard
                      key={`${item.type}-${index}-${item.data.title}`}
                      items={item}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 justify-center p-2 bg-quaternary-100 rounded-2xl w-full h-full">
                <MountainAgenda />
                <p className="text-primary-500 2xl:text-xl text-center font-medium">
                  {t("noEvents")}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
