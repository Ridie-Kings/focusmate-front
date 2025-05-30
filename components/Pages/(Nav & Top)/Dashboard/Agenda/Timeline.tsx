import TimeLeftBar from "@/components/Elements/Calendar/Timeline/TimeLeftBar";
import TimelineCard from "@/components/Elements/Calendar/Timeline/TimelineCard";
import LoadingStatus from "@/components/Elements/General/LoadingStatus";
import MountainAgenda from "@/components/Elements/Svg/Mountain/MountainAgenda";
import { TaskType } from "@/interfaces/Task/TaskType";
import { isSameDay } from "date-fns";
import { Dispatch, SetStateAction, useMemo, useState, useEffect } from "react";

interface TimelineProps {
  date: Date | undefined;
  events: TaskType[];
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  loadingEvents: boolean;
}

export default function Timeline({
  date,
  events,
  setEvents,
  setTasks,
  loadingEvents,
}: TimelineProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (!loadingEvents && isInitialLoading) {
      setIsInitialLoading(false);
    }
  }, [loadingEvents, isInitialLoading]);

  console.log(events);
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => isSameDay(new Date(event.dueDate), date ?? new Date()))
      .sort((a, b) => {
        const startDateA = new Date(a.startDate).getTime();
        const startDateB = new Date(b.startDate).getTime();
        return startDateA - startDateB;
      });
  }, [date, events]);

  return (
    <div
      id="timeline-component"
      className={`flex-1 ${
        filteredEvents.length === 0 ? "" : "min-h-44 max-h-[500px]"
      } overflow-y-auto overflow-x-hidden flex flex-col gap-4 py-2`}
    >
      <p className="text-xl text-primary-500 text-center sticky top-0 bg-white">
        Agenda del día
      </p>
      <div className="flex flex-1 gap-4">
        {loadingEvents ? (
          <LoadingStatus text="eventos" />
        ) : (
          <>
            {filteredEvents.length !== 0 ? (
              <>
                <TimeLeftBar filteredEvents={filteredEvents} />
                <div className="flex-1 flex flex-col gap-2 pt-1.5">
                  {filteredEvents.map((event, index) => (
                    <TimelineCard
                      setTasks={setTasks}
                      key={`event-${index}-${event.title}`}
                      event={event}
                      setEvents={setEvents}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 justify-center p-2 bg-quaternary-100 rounded-2xl w-full h-full">
                <MountainAgenda />
                <p className="text-primary-500 2xl:text-xl text-center font-medium">
                  Todavía no hay eventos
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
