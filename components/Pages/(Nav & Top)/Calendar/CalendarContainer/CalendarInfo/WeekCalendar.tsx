import {
  addDays,
  subDays,
  startOfDay,
  startOfWeek,
  endOfDay,
  endOfWeek,
  isSameDay,
  getDay,
  getHours,
  getMinutes,
  isToday,
} from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import Divider from "@/components/Elements/General/Divider";
import TimeLeftBar from "@/components/Elements/Calendar/TimeLeftBar";
import TimeBar from "@/components/Elements/Calendar/TimeBar";
import { TaskType } from "@/interfaces/Task/TaskType";

const WeekDay = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"];

const getNowPosition = (date: Date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);

  return hours * 2 * 48 + minutes * (48 / 30);
};

const EventItem = ({
  event,
  eventStartPosition,
  eventEndPosition,
}: {
  event: TaskType;
  eventStartPosition: number;
  eventEndPosition: number;
}) => {
  return (
    <div
      className="absolute w-[95%] bg-[#e9d2ee] py-4 px-2 rounded flex flex-col items-start place-content-between border-l-2 border-[#baa8be]"
      style={{
        top: `${eventStartPosition}px`,
        height: `${eventEndPosition - eventStartPosition}px`,
      }}
    >
      <p className="">{event.title}</p>
      <div className="flex place-content-between w-full text-gray-100 text-xs p-1">
        <span>
          {new Date(event.startDate).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span>
          {new Date(event.endDate).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

const DayColumn = ({ day, events }: { day: Date; events: TaskType[] }) => {
  return (
    <div className="flex flex-col gap-5">
      <div
        className={`text-xl flex flex-col items-center drop-shadow-lg text-center py-2 border border-primary-500 rounded-lg sticky top-0 z-10 ${
          isToday(day)
            ? "bg-primary-500 text-white"
            : "bg-white text-primary-500"
        }`}
      >
        {WeekDay[getDay(day)]}
        <Divider width="90%" />
        {day.getDate()}
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
  events,
  scrollCalendar,
}: {
  date: Date;
  events: TaskType[];
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
  }, []);

  return (
    <div
      ref={scrollCalendar}
      className="grid grid-cols-8 w-full h-full rounded-xl relative gap-2 overflow-auto 2xl:h-[calc(100vh-360px)] xl:h-[calc(100vh-200px)]"
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
      <TimeBar pos={getNowPosition(new Date())} />
      {days.map((day, index) => (
        <DayColumn key={index} day={day} events={events} />
      ))}
    </div>
  );
};

export default function WeekCalendar({
  events,
  date,
  setDate,
  scrollCalendar,
}: {
  events: TaskType[];
  date: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  scrollCalendar: RefObject<HTMLDivElement | null>;
}) {
  const handlePreviousWeek = () => {
    setDate(subDays(date, 7));
  };

  const handleNextWeek = () => {
    setDate(addDays(date, 7));
  };

  return (
    <div className="w-full flex-1 flex flex-col gap-2 place-content-between">
      <div className="flex justify-between items-center py-2">
        <button
          onClick={handlePreviousWeek}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <ArrowLeft className="mr-2" /> Semana anterior
        </button>
        <span className="font-semibold text-lg">
          {date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
          })}
        </span>
        <button
          onClick={handleNextWeek}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Semana siguiente <ArrowRight className="ml-2" />
        </button>
      </div>

      <WeekCalendarItem
        scrollCalendar={scrollCalendar}
        date={date}
        events={events}
      />
    </div>
  );
}
