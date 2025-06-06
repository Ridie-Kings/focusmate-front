import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TimelineItem } from "./TimelineCard";

export default function TimeLeftBar({
  filteredEvents,
}: {
  filteredEvents: TimelineItem[];
}) {
  return (
    <div className="flex flex-col overflow-auto gap-2">
      {filteredEvents.length > 0 &&
        filteredEvents.map((item) => (
          <div
            key={`timeline-marker-${item.data._id}`}
            className="flex flex-col items-center h-full text-primary-500 text-sm gap-2 max-h-[104px]"
          >
            <p>{format(item.startDate, "HH:mm", { locale: es })}</p>
            <div className="h-full w-[3px] bg-primary-500 rounded-full"></div>
          </div>
        ))}
    </div>
  );
}
