import TimeLeftBar from "@/components/Elements/Calendar/Timeline/TimeLeftBar";
import TimelineCard from "@/components/Elements/Calendar/Timeline/TimelineCard";
import MountainAgenda from "@/components/Elements/Svg/Mountain/MountainAgenda";

import { TaskType } from "@/interfaces/Task/TaskType";

import { isSameDay } from "date-fns";

import { useMemo } from "react";

interface TimelineProps {
  date: Date | undefined;
  events: TaskType[];
}

export default function Timeline({ date, events }: TimelineProps) {
  // console.log(events);

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      isSameDay(new Date(event.startDate), date ?? new Date())
    );
  }, [date, events]);

  return (
    <div
      className={`flex-1 ${
        filteredEvents.length === 0 ? "" : "min-h-44 max-h-96"
      }  overflow-auto flex flex-col gap-4 py-2`}
    >
      <p className="text-xl px-4 text-primary-500 text-center">
        Agenda del día
      </p>
      <div className="flex flex-1 gap-4">
        <TimeLeftBar filteredEvents={filteredEvents} />
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-2 bg-quaternary-100 rounded-2xl w-full h-full">
            <MountainAgenda />
            <p className="text-primary-500 2xl:text-xl text-center">
              ¡Buen día! Todavia no hay eventos
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-2 pt-1.5">
            {filteredEvents.map((event, index) => (
              <TimelineCard
                key={`event-${index}-${event.title}`}
                event={event}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
