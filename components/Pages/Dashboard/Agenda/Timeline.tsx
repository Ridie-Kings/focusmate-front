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
        start: new Date("December 28, 2024 18:37:00"),
        end: new Date("December 28, 2024 20:00:00"),
      },
      title: "calla bobo",
    },
    {
      date: {
        start: new Date("December 31, 2024 08:37:00"),
        end: new Date("December 31, 2024 10:00:00"),
      },
      title: "31",
    },
  ]);

  const filteredEvents = useMemo(() => {
    return date
      ? events.filter((event) => isSameDay(new Date(event.date.start), date))
      : [];
  }, [date, events]);

  const formatDuration = (start: Date, end: Date) => {
    const totalMinutes = Math.abs(differenceInMinutes(end, start));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")} min`;
  };

  return (
    <div className="w-full min-h-44 max-h-96 overflow-auto flex flex-col gap-4 py-2">
      <p className="text-2xl px-4">Timeline</p>
      <div className="flex gap-4 pl-4">
        <div className="flex flex-col overflow-auto">
          {filteredEvents.map((event) => (
            <div
              key={`timeline-marker-${event.title}`}
              className="flex flex-col items-center h-28 gap-1"
            >
              <p>{format(event.date.start, "HH:mm")}</p>
              <div className="h-full w-1 bg-black-100 rounded-full"></div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col pt-1.5">
          {filteredEvents.map((event, index) => (
            <div
              key={`event-${index}-${event.title}`}
              className="w-full h-28 bg-black-100 hover:shadow-lg text-white-100 p-2 rounded-lg shadow-md flex flex-col place-content-between transition-all duration-300 ease-in-out"
            >
              <p className="text-lg">{event.title}</p>
              <div className="flex place-content-between w-full">
                <span>
                  {event.date.start.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <p>Start</p>
                </span>
                <div className="flex items-center 2xl:px-5 px-1 h-10 bg-white-100 rounded-lg text-black">
                  <p>{formatDuration(event.date.start, event.date.end)}</p>
                </div>
                <span>
                  {event.date.end.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <p>Finish</p>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
