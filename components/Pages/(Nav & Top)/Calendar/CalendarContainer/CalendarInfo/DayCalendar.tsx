import TimeBar from "@/components/Elements/Calendar/TimeBar";
import TimeLeftBar from "@/components/Elements/Calendar/TimeLeftBar";
import { useModalStore } from "@/stores/modalStore";
import Menu from "@/components/Reusable/Menu";
import AgendaUtils from "@/lib/AgendaUtils";

import { getHours, getMinutes, isSameDay, format } from "date-fns";
import { Pen, Trash2 } from "lucide-react";

import { SetStateAction, Dispatch, useRef, useEffect, useState } from "react";
import SelectedEventInfo from "./DayCalendar/SelectedEventInfo";
import { useDashboardStore } from "@/stores/dashboardStore";
import { TimelineItem } from "@/components/Elements/Calendar/Timeline/TimelineCard";
import CalendarUtils from "@/lib/CalendarUtils";
import { useDate } from "@/stores/calendarStore";

const getPosition = (date: Date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);

  return 14 + hours * 2 * (28 + 40) + minutes * ((28 + 40) / 30);
};

const DayCalendarItem = ({
  setSelectedCalendarItem,
}: {
  setSelectedCalendarItem: Dispatch<SetStateAction<TimelineItem | null>>;
}) => {
  const date = useDate() ?? new Date();
  const { formatCalendar } = CalendarUtils();

  const scrollCalendar = useRef<HTMLDivElement>(null);
  const { setIsOpen } = useModalStore((state) => state.actions);
  const { isLightColor, getDarkerColor, formatDuration } = AgendaUtils();

  const { removeEvent } = useDashboardStore((state) => state.actions);

  useEffect(() => {
    if (scrollCalendar.current) {
      const todayEvents = formatCalendar.filter((event) =>
        isSameDay(event.data.startDate, date)
      );

      if (todayEvents.length > 0) {
        const earliestEvent = todayEvents.reduce((earliest, current) =>
          current.startDate < earliest.startDate ? current : earliest
        );

        const scrollPosition = Math.max(
          0,
          getPosition(earliestEvent.startDate) - 100
        );

        scrollCalendar.current.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      } else {
        const defaultPosition = getPosition(
          new Date(date.setHours(8, 0, 0, 0))
        );
        scrollCalendar.current.scrollTo({
          top: defaultPosition,
          behavior: "smooth",
        });
      }
    }
  }, [date, formatCalendar]);

  return (
    <div
      ref={scrollCalendar}
      className="flex w-full h-screen sm:h-full rounded-2xl relative gap-2  xl:h-[calc(100vh-200px)] 2xl:h-[calc(100vh-300px)] overflow-x-hidden overflow-y-auto"
    >
      <TimeLeftBar length={48} divider={2} calc={1} />
      <TimeBar pos={getPosition(new Date())} />
      <div className="relative w-full h-full">
        {formatCalendar
          .filter((calendarItem) =>
            isSameDay(calendarItem.data.startDate, date)
          )
          .map((calendarItem, index) => {
            const calendarData = calendarItem.data;

            const eventStartPosition = getPosition(calendarData.startDate);
            const eventEndPosition = getPosition(calendarData.endDate);
            const textColor = isLightColor(calendarData.color)
              ? "text-black"
              : "text-white";
            const darkerColor = getDarkerColor(calendarData.color);

            return (
              <div
                key={index}
                className="absolute w-full  hover:shadow-lg text-black px-8 py-6 rounded-lg drop-shadow-xl flex flex-col place-content-between transition-all duration-300"
                onDoubleClick={() => {
                  setSelectedCalendarItem((prev) =>
                    prev === calendarItem ? null : calendarItem
                  );
                  scrollCalendar.current?.scrollTo({
                    top: getPosition(calendarData.startDate),
                    behavior: "smooth",
                  });
                }}
                style={{
                  backgroundColor: calendarData.color,
                  top: `${eventStartPosition}px`,
                  height: `${eventEndPosition - eventStartPosition}px`,
                }}
              >
                <div className="w-full flex items-center place-content-between sticky top-5">
                  <p className="text-2xl">{calendarData.title}</p>
                  <Menu
                    className={textColor}
                    items={[
                      {
                        label: "Modificar",
                        icon: <Pen size={20} />,
                        onClick: () =>
                          setIsOpen({
                            text: "event",
                            other: calendarItem,
                          }),
                      },
                      {
                        label: "Eliminar",
                        color: "red",
                        icon: <Trash2 />,
                        onClick: () => removeEvent(calendarData._id),
                      },
                    ]}
                  />
                </div>
                <div
                  style={{
                    backgroundColor: calendarItem.data.color,
                  }}
                  className="flex place-content-between items-center w-full z-10"
                >
                  <span className={textColor}>
                    {format(calendarData.startDate, "HH:mm aaa")}{" "}
                  </span>
                  <p
                    style={{ backgroundColor: darkerColor }}
                    className="flex items-center py-0.5 px-2 text-sm rounded-full text-white"
                  >
                    {formatDuration(
                      calendarData.startDate,
                      calendarData.endDate
                    )}
                  </p>
                  <span className={textColor}>
                    {format(calendarData.endDate, "HH:mm aaa")}{" "}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default function DayCalendar() {
  const [selectedCalendarItem, setSelectedCalendarItem] =
    useState<TimelineItem | null>(null);

  return (
    <div className="flex flex-1 gap-2">
      <DayCalendarItem setSelectedCalendarItem={setSelectedCalendarItem} />
      <SelectedEventInfo selectedCalendarItem={selectedCalendarItem} />
    </div>
  );
}
