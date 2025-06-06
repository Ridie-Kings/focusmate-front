import TimeBar from "@/components/Elements/Calendar/TimeBar";
import TimeLeftBar from "@/components/Elements/Calendar/TimeLeftBar";
import { useModalStore } from "@/stores/modalStore";
import Menu from "@/components/Reusable/Menu";
import { TaskType } from "@/interfaces/Task/TaskType";
import AgendaUtils from "@/lib/AgendaUtils";
import TaskUtils from "@/lib/Task/TaskUtils";

import { getHours, getMinutes, isSameDay, format } from "date-fns";
import { Pen, Trash2 } from "lucide-react";

import { SetStateAction, Dispatch, useRef, useEffect, useState } from "react";
import SelectedEventInfo from "./DayCalendar/SelectedEventInfo";

const getPosition = (date: Date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);

  return 14 + hours * 2 * (28 + 40) + minutes * ((28 + 40) / 30);
};

const DayCalendarItem = ({
  date,
  events,
  setEvents,
  setSelectedEvent,
}: {
  date: Date;
  events: TaskType[];
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
  setSelectedEvent: Dispatch<SetStateAction<TaskType | null>>;
}) => {
  const scrollCalendar = useRef<HTMLDivElement>(null);
  const { setIsOpen } = useModalStore();
  const { isLightColor, getDarkerColor, formatDuration } = AgendaUtils();

  const { handleDeleteTask } = TaskUtils({
    setEvents,
  });

  useEffect(() => {
    if (scrollCalendar.current) {
      const todayEvents = events.filter((event) =>
        isSameDay(event.dueDate, date)
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
  }, [date, events]);

  return (
    <div
      ref={scrollCalendar}
      className="flex w-full h-screen sm:h-full rounded-2xl relative gap-2  xl:h-[calc(100vh-200px)] 2xl:h-[calc(100vh-300px)] overflow-x-hidden overflow-y-auto"
    >
      <TimeLeftBar length={48} divider={2} calc={1} />
      <TimeBar pos={getPosition(new Date())} />
      <div className="relative w-full h-full">
        {events
          .filter((event) => isSameDay(event.dueDate, date))
          .map((event, index) => {
            const eventStartPosition = getPosition(event.startDate);
            const eventEndPosition = getPosition(event.endDate);
            const textColor = isLightColor(event.color)
              ? "text-black"
              : "text-white";
            const darkerColor = getDarkerColor(event.color);

            return (
              <div
                key={index}
                className="absolute w-full  hover:shadow-lg text-black px-8 py-6 rounded-lg drop-shadow-xl flex flex-col place-content-between transition-all duration-300"
                onDoubleClick={() => {
                  setSelectedEvent((prev) => (prev === event ? null : event));
                  scrollCalendar.current?.scrollTo({
                    top: getPosition(event.startDate),
                    behavior: "smooth",
                  });
                }}
                style={{
                  backgroundColor: event.color,
                  top: `${eventStartPosition}px`,
                  height: `${eventEndPosition - eventStartPosition}px`,
                }}
              >
                <div className="w-full flex items-center place-content-between sticky top-5">
                  <p className="text-2xl">{event.title}</p>
                  <Menu
                    className={textColor}
                    items={[
                      {
                        label: "Modificar",
                        icon: <Pen size={20} />,
                        onClick: () =>
                          setIsOpen({ text: "event", other: event }),
                      },
                      {
                        label: "Eliminar",
                        color: "red",
                        icon: <Trash2 />,
                        onClick: () => handleDeleteTask(event._id),
                      },
                    ]}
                  />
                </div>
                <div
                  style={{
                    backgroundColor: event.color,
                  }}
                  className="flex place-content-between items-center w-full z-10"
                >
                  <span className={textColor}>
                    {format(event.startDate, "HH:mm aaa")}{" "}
                  </span>
                  <p
                    style={{ backgroundColor: darkerColor }}
                    className="flex items-center py-0.5 px-2 text-sm rounded-full text-white"
                  >
                    {formatDuration(event.startDate, event.endDate)}
                  </p>
                  <span className={textColor}>
                    {format(event.endDate, "HH:mm aaa")}{" "}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default function DayCalendar({
  events,
  date,
  setEvents,
}: {
  events: TaskType[];
  date: Date;
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
}) {
  const [selectedEvent, setSelectedEvent] = useState<TaskType | null>(null);

  return (
    <div className="flex flex-1 gap-2">
      <DayCalendarItem
        date={date}
        events={events}
        setEvents={setEvents}
        setSelectedEvent={setSelectedEvent}
      />
      <SelectedEventInfo selectedEvent={selectedEvent} />
    </div>
  );
}
