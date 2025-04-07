import { EventType } from "@/interfaces/Calendar/EventType";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function TimeLeftBar({
  filteredEvents,
}: {
  filteredEvents: EventType[];
}) {
  return (
    <div className="flex flex-col overflow-auto">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <div
            key={`timeline-marker-${event.title}`}
            className="flex flex-col items-center h-full text-primary-green text-sm gap-2"
          >
            <p>{format(event.date.start, "HH:mm", { locale: es })}</p>
            <div className="h-full w-[3px] bg-primary-green rounded-full"></div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center gap-1 py-4">
          <p className="text-gray-500">No tienes evento este dia</p>
        </div>
      )}
    </div>
  );
}
