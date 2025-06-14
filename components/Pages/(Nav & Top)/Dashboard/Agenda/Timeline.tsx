import TimeLeftBar from "@/components/Elements/Calendar/Timeline/TimeLeftBar";
import TimelineCard from "@/components/Elements/Calendar/Timeline/TimelineCard";
import LoadingStatus from "@/components/Elements/General/LoadingStatus";
import MountainAgenda from "@/components/Elements/Svg/Mountain/MountainAgenda";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import CalendarUtils from "@/lib/CalendarUtils";
import { TimelineItem } from "@/components/Elements/Calendar/Timeline/TimelineCard";
import { EventType } from "@/interfaces/Calendar/EventType";
import Link from "next/link";

interface TimelineProps {
  loadingEvents: boolean;
}

const doIntervalsOverlap = (item1: TimelineItem, item2: TimelineItem) => {
  if (item1.type === "task" || item2.type === "task") {
    return item1.startDate.getTime() === item2.startDate.getTime();
  }

  const start1 = new Date(item1.startDate).getTime();
  const end1 = new Date((item1.data as EventType).endDate).getTime();
  const start2 = new Date(item2.startDate).getTime();
  const end2 = new Date((item2.data as EventType).endDate).getTime();

  return start1 <= end2 && end1 >= start2;
};

export default function Timeline({ loadingEvents }: TimelineProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const t = useTranslations("Dashboard.agenda.timeline");

  useEffect(() => {
    if (!loadingEvents && isInitialLoading) setIsInitialLoading(false);
  }, [loadingEvents, isInitialLoading]);

  const { formatCalendar } = CalendarUtils({ navType: "day" });

  const itemsWithOverlap = formatCalendar.map((item) => {
    const isOverlapping = formatCalendar.some(
      (otherItem) => otherItem !== item && doIntervalsOverlap(item, otherItem)
    );
    return { ...item, isOverlapping };
  });

  const groupedItems = itemsWithOverlap.reduce((acc, item) => {
    const groupKey = Object.keys(acc).find((key) => {
      const groupItems = acc[parseInt(key)];
      return groupItems.some((existingItem) =>
        doIntervalsOverlap(item, existingItem)
      );
    });

    if (groupKey) {
      acc[parseInt(groupKey)].push(item);
    } else {
      acc[item.startDate.getTime()] = [item];
    }
    return acc;
  }, {} as Record<number, (TimelineItem & { isOverlapping: boolean })[]>);

  return (
    <div
      id="timeline-component"
      className={`flex-1 ${
        formatCalendar.length === 0 ? "" : "min-h-44 max-h-[460px]"
      } overflow-y-auto overflow-x-hidden flex flex-col gap-4`}
    >
      <p className="text-xl text-primary-500 text-center sticky top-0 bg-white z-10 py-2">
        {t("title")}
      </p>
      {loadingEvents ? (
        <LoadingStatus text="eventos" />
      ) : (
        <>
          {formatCalendar.length !== 0 ? (
            <div className="flex gap-4">
              <TimeLeftBar filteredEvents={itemsWithOverlap} />
              <div className="flex-1 flex flex-col gap-2 pt-1.5 min-w-0">
                {Object.entries(groupedItems).map(([timeKey, items]) => (
                  <div
                    key={timeKey}
                    className={`gap-2 items-center ${
                      items.length > 2 ? "flex" : "grid grid-cols-2 w-full"
                    }`}
                  >
                    {items.slice(0, 2).map((item, index) => (
                      <div
                        key={`${item.type}-${index}-${item.data.title}`}
                        className={`min-w-0 ${
                          items.length > 2
                            ? "flex-shrink-0 w-[calc(50%-1.5rem)]"
                            : ""
                        }`}
                      >
                        <TimelineCard
                          item={item}
                          hasOverlappingEvents={item.isOverlapping}
                        />
                      </div>
                    ))}
                    {items.length > 2 && (
                      <Link className="cursor-pointer" href={"/calendar"}>
                        + {items.length - 2}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 justify-center p-2 bg-quaternary-100 rounded-2xl w-full h-full">
              <MountainAgenda />
              <p className="text-primary-500 2xl:text-xl text-center font-medium">
                {t("noEvents")}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
