import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TimelineItem as BaseTimelineItem } from "./TimelineCard";

type TimelineItem = BaseTimelineItem & {
  isOverlapping: boolean;
};

export default function TimeLeftBar({
  filteredEvents,
}: {
  filteredEvents: TimelineItem[];
}) {
  const uniqueEvents = filteredEvents.reduce((acc, current) => {
    const isDuplicate = acc.some(
      (item) =>
        item.type === current.type &&
        item.startDate.getTime() === current.startDate.getTime() &&
        item.isOverlapping &&
        current.isOverlapping
    );
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, [] as TimelineItem[]);

  const getHeight = (item: TimelineItem) => {
    if (item.type === "event") return "max-h-[104px]";
    const duplicates = filteredEvents.filter(
      (event) =>
        event.type === item.type &&
        event.startDate.getTime() === item.startDate.getTime() &&
        event.isOverlapping &&
        item.isOverlapping
    );
    return duplicates.length > 2 ? "max-h-[71px]" : "max-h-[56px]";
  };

  return (
    <div className="flex flex-col overflow-auto gap-2 pt-1.5">
      {uniqueEvents.length > 0 &&
        uniqueEvents.map((item) => (
          <div
            key={`timeline-marker-${item.data._id}`}
            className={`flex flex-col items-center justify-center h-full text-primary-500 text-sm gap-2 ${getHeight(
              item
            )}`}
          >
            <p>{format(item.startDate, "HH:mm", { locale: es })}</p>

            <div className="flex-1 w-[3px] bg-primary-500 rounded-full"></div>
          </div>
        ))}
    </div>
  );
}
