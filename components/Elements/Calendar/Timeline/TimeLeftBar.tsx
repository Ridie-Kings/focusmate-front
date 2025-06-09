import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TimelineItem } from "./TimelineCard";
import { Dot } from "lucide-react";

export default function TimeLeftBar({
  filteredEvents,
}: {
  filteredEvents: TimelineItem[];
}) {
  return (
    <div className="flex flex-col overflow-auto gap-2 pt-1.5">
      {filteredEvents.length > 0 &&
        filteredEvents.map((item) => (
          <div
            key={`timeline-marker-${item.data._id}`}
            className={`flex flex-col items-center justify-center h-full text-primary-500 text-sm gap-2 ${
              item.type === "event" ? "max-h-[104px]" : "max-h-[56px]"
            }`}
          >
            {item.type === "event" ? (
              <p>{format(item.data.startDate, "HH:mm", { locale: es })}</p>
            ) : (
              <div className="size-2 bg-primary-500 rounded-full" />
            )}
            <div className="flex-1 w-[3px] bg-primary-500 rounded-full"></div>
          </div>
        ))}
    </div>
  );
}
