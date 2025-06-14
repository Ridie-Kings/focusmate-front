import TimeBar from "@/components/Elements/Calendar/TimeBar";
import TimeLeftBar from "@/components/Elements/Calendar/TimeLeftBar";
import { useModalStore } from "@/stores/modalStore";
import Menu from "@/components/Reusable/Menu";
import AgendaUtils from "@/lib/AgendaUtils";

import { getHours, getMinutes, isSameDay, format } from "date-fns";
import { Calendar, ClipboardCheck, Pen, Trash2 } from "lucide-react";

import { SetStateAction, Dispatch, useRef, useEffect, useState } from "react";
import SelectedEventInfo from "./DayCalendar/SelectedEventInfo";
import { useDashboardStore } from "@/stores/dashboardStore";
import { TimelineItem } from "@/components/Elements/Calendar/Timeline/TimelineCard";
import CalendarUtils from "@/lib/CalendarUtils";
import { useDate } from "@/stores/calendarStore";
import { TaskType } from "@/interfaces/Task/TaskType";
import { es } from "date-fns/locale";

const getPosition = (date: Date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);

  return 14 + hours * 2 * (28 + 40) + minutes * ((28 + 40) / 30);
};

const findOverlappingEvents = (
  events: TimelineItem[],
  currentEvent: TimelineItem
) => {
  return events.filter((event) => {
    const currentStart = new Date(
      event.type === "task"
        ? (event.data as TaskType).dueDate
        : event.data.startDate
    ).getTime();
    const currentEnd = new Date(
      event.type === "task"
        ? (event.data as TaskType).dueDate
        : event.data.endDate
    ).getTime();
    const eventStart = new Date(
      currentEvent.type === "task"
        ? (currentEvent.data as TaskType).dueDate
        : currentEvent.data.startDate
    ).getTime();
    const eventEnd = new Date(
      currentEvent.type === "task"
        ? (currentEvent.data as TaskType).dueDate
        : currentEvent.data.endDate
    ).getTime();

    return (
      (currentStart <= eventEnd && currentEnd >= eventStart) ||
      (eventStart <= currentEnd && eventEnd >= currentStart)
    );
  });
};

const DayCalendarItem = ({
  setSelectedCalendarItem,
}: {
  setSelectedCalendarItem: Dispatch<SetStateAction<TimelineItem | null>>;
}) => {
  const date = useDate() ?? new Date();
  const { formatCalendar } = CalendarUtils({ navType: "day" });

  const scrollCalendar = useRef<HTMLDivElement>(null);
  const { setIsOpen } = useModalStore((state) => state.actions);
  const { isLightColor, getDarkerColor, formatDuration } = AgendaUtils();

  const { removeEvent } = useDashboardStore((state) => state.actions);

  useEffect(() => {
    if (scrollCalendar.current) {
      const todayEvents = formatCalendar.filter((event) =>
        isSameDay(event.startDate, date)
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

  const todayEvents = formatCalendar.filter((calendarItem) =>
    isSameDay(calendarItem.startDate, date)
  );

  return (
    <div
      ref={scrollCalendar}
      className="flex w-full rounded-2xl relative gap-2 h-[calc(100vh-152px)] overflow-x-hidden overflow-y-auto"
    >
      <TimeLeftBar length={48} divider={2} calc={1} />
      <TimeBar pos={getPosition(new Date())} />
      <div className="relative w-full h-full">
        {todayEvents.map((calendarItem, index) => {
          const calendarData = calendarItem.data;
          const eventStartPosition = getPosition(calendarData.startDate);
          const eventEndPosition = getPosition(calendarData.endDate);
          const textColor = isLightColor(calendarData.color)
            ? "text-black"
            : "text-white";
          const darkerColor = getDarkerColor(calendarData.color);

          const overlappingEvents = findOverlappingEvents(
            todayEvents,
            calendarItem
          );
          const eventIndex = overlappingEvents.findIndex(
            (event) => event === calendarItem
          );
          const totalOverlapping = overlappingEvents.length;
          const width = `${98 / totalOverlapping}%`;
          const left = `${(100 / totalOverlapping) * eventIndex}%`;
          const totalHeight = eventEndPosition - eventStartPosition;

          return (
            <div
              key={index}
              className={`absolute hover:shadow-lg text-black ${
                totalHeight < 100
                  ? "px-4 items-center justify-center"
                  : "px-8 py-6"
              }   rounded-lg drop-shadow-xl flex flex-col place-content-between transition-all duration-300`}
              onDoubleClick={() => {
                if (calendarItem.type === "task") return;
                setSelectedCalendarItem((prev) =>
                  prev === calendarItem ? null : calendarItem
                );
                scrollCalendar.current?.scrollTo({
                  top: getPosition(calendarData.startDate),
                  behavior: "smooth",
                });
              }}
              style={{
                backgroundColor:
                  calendarData.color !== "" ? calendarData.color : "#000000",
                top:
                  calendarItem.type === "task"
                    ? getPosition((calendarData as TaskType).dueDate)
                    : `${eventStartPosition}px`,
                height:
                  calendarItem.type === "task"
                    ? 80
                    : `${eventEndPosition - eventStartPosition}px`,
                width,
                left,
              }}
            >
              <div className="w-full flex items-center place-content-between sticky top-5">
                <div className="flex items-center gap-2">
                  {calendarItem.type === "event" ? (
                    <Calendar size={20} className={textColor} />
                  ) : (
                    <ClipboardCheck size={20} className={textColor} />
                  )}
                  <p className={`text-2xl truncate ${textColor}`}>
                    {calendarData.title}
                  </p>
                  {overlappingEvents.length <= 3 &&
                    calendarItem.type === "task" && (
                      <p className="text-sm">
                        {format(calendarItem.startDate, "HH:mm aaa", {
                          locale: es,
                        })}
                      </p>
                    )}
                </div>
                <Menu
                  className={textColor}
                  items={[
                    {
                      label: "Modificar",
                      icon: <Pen size={20} />,
                      onClick: () =>
                        setIsOpen({
                          text: calendarItem.type,
                          other: calendarItem.data,
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
              {calendarItem.type === "event" && totalHeight > 100 && (
                <div
                  style={{
                    backgroundColor: calendarItem.data.color,
                  }}
                  className="flex place-content-between items-center w-full z-10"
                >
                  <span className={textColor}>
                    {format(
                      calendarData.startDate,
                      totalOverlapping < 3 ? "HH:mm aaa" : "HH:mm",
                      {
                        locale: es,
                      }
                    )}{" "}
                  </span>
                  {totalOverlapping < 3 && (
                    <p
                      style={{ backgroundColor: darkerColor }}
                      className="flex items-center py-0.5 px-2 text-sm rounded-full text-white"
                    >
                      {formatDuration(
                        calendarData.startDate,
                        calendarData.endDate
                      )}
                    </p>
                  )}
                  <span className={textColor}>
                    {format(
                      calendarData.endDate,
                      totalOverlapping < 3 ? "HH:mm aaa" : "HH:mm",
                      { locale: es }
                    )}{" "}
                  </span>
                </div>
              )}
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
