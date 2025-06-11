import {
  addDays,
  startOfDay,
  startOfWeek,
  endOfDay,
  endOfWeek,
  isSameDay,
  getDay,
  getHours,
  getMinutes,
  isToday,
  format,
  differenceInHours,
} from "date-fns";
import { Pen, Trash2 } from "lucide-react";
import { RefObject, useEffect } from "react";
import Divider from "@/components/Elements/General/Divider";
import TimeLeftBar from "@/components/Elements/Calendar/TimeLeftBar";
import TimeBar from "@/components/Elements/Calendar/TimeBar";
import Menu from "@/components/Reusable/Menu";
import AgendaUtils from "@/lib/AgendaUtils";
import { useModalStore } from "@/stores/modalStore";
import { useDashboardStore } from "@/stores/dashboardStore";
import { TimelineItem } from "@/components/Elements/Calendar/Timeline/TimelineCard";
import CalendarUtils from "@/lib/CalendarUtils";
import { useCalendarStore, useDate } from "@/stores/calendarStore";

const WeekDay = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"];

const getNowPosition = (date: Date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);

  return 24 + hours * 2 * 68 + minutes * (68 / 30);
};

const EventItem = ({
  calendarItem,
  eventStartPosition,
  eventEndPosition,
}: {
  calendarItem: TimelineItem;
  eventStartPosition: number;
  eventEndPosition: number;
}) => {
  const calendarData = calendarItem.data;
  const { setIsOpen } = useModalStore((state) => state.actions);
  const { isLightColor } = AgendaUtils();

  const { removeEvent } = useDashboardStore((state) => state.actions);
  const textColor = isLightColor(calendarData.color)
    ? "text-black"
    : "text-white";

  return (
    <div
      className="absolute w-[95%] p-2 rounded-lg flex flex-col items-start place-content-between"
      style={{
        backgroundColor:
          calendarData.color !== "" ? calendarData.color : "#000000",
        top: `${eventStartPosition}px`,
        height: `${eventEndPosition - eventStartPosition}px`,
      }}
    >
      <div className="w-full flex items-center place-content-between sticky top-15">
        <p className={`text-sm ${textColor}`}>{calendarData.title}</p>
        <Menu
          className={textColor}
          position={
            differenceInHours(calendarData.endDate, calendarData.startDate) < 1
              ? "top-right"
              : "bottom-right"
          }
          items={[
            {
              label: "Modificar",
              icon: <Pen size={20} />,
              onClick: () => setIsOpen({ text: "event", other: event }),
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
        style={{ backgroundColor: calendarData.color }}
        className={`${textColor} flex place-content-between w-full text-xs p-1 z-8`}
      >
        <span>{format(calendarData.startDate, "HH:mm")} </span>
        <span>{format(calendarData.endDate, "HH:mm")} </span>
      </div>
    </div>
  );
};

const DayColumn = ({
  day,
  selectedDate,
}: {
  day: Date;
  selectedDate: Date;
}) => {
  const { setDate } = useCalendarStore((state) => state.actions);
  const { formatCalendar } = CalendarUtils({ navType: "week" });

  return (
    <div className="flex flex-col gap-5">
      <div
        onClick={() => setDate(day)}
        className={`flex cursor-pointer items-center place-content-between px-3 drop-shadow-lg text-center py-2 rounded-lg sticky top-0 z-10 ${
          isToday(day)
            ? "bg-primary-400 text-white"
            : isSameDay(day, selectedDate)
            ? " bg-secondary-700 text-white"
            : "bg-white text-primary-500 border border-primary-500"
        }`}
      >
        {WeekDay[getDay(day)]}
        <Divider width="1px" height="100%" />
        <p
          className={` text-white rounded-lg text-xl py-1 px-1.5 ${
            isToday(day) ? "bg-primary-500" : "bg-primary-400"
          }`}
        >
          {day.getDate().toString().padStart(2, "0")}
        </p>
      </div>
      <div
        className={`text-center p-1 h-full rounded-lg transition-all duration-200 relative`}
      >
        {formatCalendar
          .filter((calendarItem) => isSameDay(calendarItem.data.startDate, day))
          .map((calendarItem, i) => {
            const calendarData = calendarItem.data;
            const eventStartPosition = getNowPosition(calendarData.startDate);
            const eventEndPosition = getNowPosition(calendarData.endDate);

            return (
              <EventItem
                key={i}
                calendarItem={calendarItem}
                eventStartPosition={eventStartPosition}
                eventEndPosition={eventEndPosition}
              />
            );
          })}
      </div>
    </div>
  );
};

const WeekCalendarItem = ({
  scrollCalendar,
}: {
  scrollCalendar: RefObject<HTMLDivElement | null>;
}) => {
  const date = useDate() ?? new Date();

  const startDate = startOfDay(startOfWeek(date, { weekStartsOn: 1 }));
  const endDate = endOfDay(endOfWeek(date, { weekStartsOn: 1 }));

  const days = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  useEffect(() => {
    if (scrollCalendar.current) {
      scrollCalendar.current.scrollTo(0, 750);
    }
  }, [scrollCalendar]);

  return (
    <div
      ref={scrollCalendar}
      className="grid grid-cols-8 w-full h-screen sm:h-full rounded-xl relative gap-2 overflow-auto xl:h-[calc(100vh-152px)] 2xl:h-[calc(100vh-360px)]"
    >
      <div className="flex flex-col gap-5 relative">
        <div
          className={`text-sm flex flex-col text-transparent py-2 border-2 border-transparent pointer-events-none`}
        >
          Don &apos;t look
          <Divider backgroundColor="white" />
          at the code
        </div>
        <TimeLeftBar length={49} divider={2} calc={1} />
      </div>
      <TimeBar pos={getNowPosition(new Date()) + 71} />
      {days.map((day, index) => (
        <DayColumn key={index} day={day} selectedDate={date} />
      ))}
    </div>
  );
};

export default function WeekCalendar({
  scrollCalendar,
}: {
  scrollCalendar: RefObject<HTMLDivElement | null>;
}) {
  return <WeekCalendarItem scrollCalendar={scrollCalendar} />;
}
