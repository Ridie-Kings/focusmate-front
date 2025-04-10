import { TaskType } from "@/interfaces/Task/TaskType";

import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function TimeLeftBar({
  filteredEvents,
}: {
  filteredEvents: TaskType[];
}) {
  return (
    <div className="flex flex-col overflow-auto gap-2">
      {filteredEvents.length > 0 &&
        filteredEvents.map((event) => (
          <div
            key={`timeline-marker-${event._id}`}
            className="flex flex-col items-center h-full text-primary-500 text-sm gap-2 max-h-[104px]"
          >
            <p>{format(event.startDate, "HH:mm", { locale: es })}</p>
            <div className="h-full w-[3px] bg-primary-500 rounded-full"></div>
          </div>
        ))}
    </div>
  );
}
