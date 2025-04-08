import TimeLeftBar from "@/components/Elements/Calendar/Timeline/TimeLeftBar";
import TimelineCard from "@/components/Elements/Calendar/Timeline/TimelineCard";
import MountainAgenda from "@/components/Elements/Svg/MountainAgenda";
import { EventType } from "@/interfaces/Calendar/EventType";
import { isSameDay } from "date-fns";
import { useMemo } from "react";

interface TimelineProps {
  date: Date | undefined;
  events: EventType[];
}

export default function Timeline({ date, events }: TimelineProps) {
  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      isSameDay(new Date(event.date.start), date ?? new Date())
    );
  }, [date, events]);

  return (
    <div className="flex-1 min-h-44 max-h-96 overflow-auto flex flex-col gap-4 py-2">
      <p className="text-2xl px-4">Timeline</p>
      <div className="flex gap-4">
        <TimeLeftBar filteredEvents={filteredEvents} />
        {filteredEvents.length === 0 && (
          <div className="flex flex-col items-center">
            <MountainAgenda />
            <p className="text-primary-500 2xl:text-xl">
              ¡Buen día! Todavia no hay eventos
            </p>
          </div>
        )}
        <div className="flex-1 flex flex-col pt-1.5">
          {filteredEvents.map((event, index) => (
            <TimelineCard key={`event-${index}-${event.title}`} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
