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
} from "date-fns";
import { Pen, Trash2 } from "lucide-react";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import Divider from "@/components/Elements/General/Divider";
import TimeLeftBar from "@/components/Elements/Calendar/TimeLeftBar";
import TimeBar from "@/components/Elements/Calendar/TimeBar";
import { TaskType } from "@/interfaces/Task/TaskType";
import Menu from "@/components/Reusable/Menu";
import AgendaUtils from "@/lib/AgendaUtils";
import TaskUtils from "@/lib/Task/TaskUtils";
import { ModalContext } from "@/components/Provider/ModalProvider";

const WeekDay = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"];

const getNowPosition = (date: Date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);

  return 24 + hours * 2 * 88 + minutes * (88 / 30);
};

const EventItem = ({
  event,
  setEvents,
  eventStartPosition,
  eventEndPosition,
}: {
  event: TaskType;
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
  eventStartPosition: number;
  eventEndPosition: number;
}) => {
  const { setIsOpen } = useContext(ModalContext);
  const { isLightColor } = AgendaUtils();

  const { handleDeleteTask } = TaskUtils({
    setEvents,
  });
  const textColor = isLightColor(event.color) ? "text-black" : "text-white";

  return (
    <div
      className="absolute w-[95%] p-2 rounded-lg flex flex-col items-start place-content-between"
      style={{
        backgroundColor: event.color,
        top: `${eventStartPosition}px`,
        height: `${eventEndPosition - eventStartPosition}px`,
      }}
    >
      <div className="w-full flex items-center place-content-between sticky top-15">
        <p className="text-sm">{event.title}</p>
        <Menu
          className={textColor}
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
              onClick: () => handleDeleteTask(event._id),
            },
          ]}
        />
      </div>
      <div
        style={{ backgroundColor: event.color }}
        className={`${textColor} flex place-content-between w-full text-xs p-1 z-8`}
      >
        <span>{format(event.startDate, "HH:mm")} </span>
        <span>{format(event.endDate, "HH:mm")} </span>
      </div>
    </div>
  );
};

const DayColumn = ({
  day,
  events,
  setEvents,
  selectedDate,
  setDate,
}: {
  day: Date;
  events: TaskType[];
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
  selectedDate: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) => {
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
        {events
          .filter((event) => isSameDay(event.dueDate, day))
          .map((event, i) => {
            const eventStartPosition = getNowPosition(event.startDate);
            const eventEndPosition = getNowPosition(event.endDate);

            return (
              <EventItem
                key={i}
                event={event}
                setEvents={setEvents}
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
  date,
  setDate,
  events,
  setEvents,
  scrollCalendar,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  events: TaskType[];
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
  scrollCalendar: RefObject<HTMLDivElement | null>;
}) => {
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
      className="grid grid-cols-8 w-full h-screen sm:h-full rounded-xl relative gap-2 overflow-auto 2xl:h-[calc(100vh-360px)] xl:h-[calc(100vh-200px)]"
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
        <DayColumn
          key={index}
          day={day}
          events={events}
          setEvents={setEvents}
          selectedDate={date}
          setDate={setDate}
        />
      ))}
    </div>
  );
};

export default function WeekCalendar({
  events,
  setEvents,
  date,
  setDate,
  scrollCalendar,
}: {
  events: TaskType[];
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
  date: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  scrollCalendar: RefObject<HTMLDivElement | null>;
}) {
  return (
    <WeekCalendarItem
      scrollCalendar={scrollCalendar}
      date={date}
      setDate={setDate}
      events={events}
      setEvents={setEvents}
    />
  );
}
