import TimeLeftBar from "@/components/Elements/Calendar/Timeline/TimeLeftBar";
import TimelineCard from "@/components/Elements/Calendar/Timeline/TimelineCard";
import { EventType } from "@/interfaces/Calendar/EventType";
import { differenceInMinutes, format, isSameDay } from "date-fns";
import { useState, useMemo } from "react";

interface TimelineProps {
  date: Date | undefined;
}

export default function Timeline({ date }: TimelineProps) {
  const [events] = useState<EventType[]>([
    {
      date: {
        start: new Date("April 2, 2025 18:37:00"),
        end: new Date("April 2, 2025 20:00:00"),
      },
      title: "calla bobo",
    },
    {
      date: {
        start: new Date("April 3, 2025 08:37:00"),
        end: new Date("April 3, 2025 10:00:00"),
      },
      title: "31",
    },
  ]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      isSameDay(new Date(event.date.start), date ?? new Date())
    );
  }, [date, events]);

  return (
    <div className="w-full min-h-44 max-h-96 overflow-auto flex flex-col gap-4 py-2">
      <p className="text-2xl px-4">Timeline</p>
      <div className="flex gap-4 pl-4">
        <TimeLeftBar filteredEvents={filteredEvents} />
        <div className="flex-1 flex flex-col pt-1.5">
          {filteredEvents.map((event, index) => (
            <TimelineCard key={`event-${index}-${event.title}`} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
