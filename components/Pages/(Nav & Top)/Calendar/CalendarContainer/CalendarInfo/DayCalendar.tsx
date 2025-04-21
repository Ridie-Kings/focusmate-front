import TimeBar from "@/components/Elements/Calendar/TimeBar";
import TimeLeftBar from "@/components/Elements/Calendar/TimeLeftBar";
import { TaskType } from "@/interfaces/Task/TaskType";
import {
  addDays,
  subDays,
  getHours,
  getMinutes,
  differenceInMinutes,
  isSameDay,
} from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SetStateAction, Dispatch, useRef, useEffect, useState } from "react";

const getPosition = (date: Date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);

  return 14 + hours * 4 * 48 + minutes * (48 / 15);
};

const DayCalendarItem = ({
  date,
  events,
}: {
  date: Date;
  events: TaskType[];
}) => {
  const scrollCalendar = useRef<HTMLDivElement>(null);

  const formatDuration = (start: Date, end: Date) => {
    const totalMinutes = Math.abs(differenceInMinutes(end, start));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")} horas`;
    }
    return `${minutes} min`;
  };

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
      className="flex w-full rounded-xl relative gap-2 overflow-auto 2xl:h-[calc(100vh-360px)] xl:h-[calc(100vh-200px)]"
    >
      <TimeLeftBar length={97} divider={4} calc={2} />
      <TimeBar pos={getPosition(new Date())} />
      <div className="relative w-full h-full">
        {events
          .filter((event) => isSameDay(event.dueDate, date))
          .map((event, index) => {
            const eventStartPosition = getPosition(event.startDate);
            const eventEndPosition = getPosition(event.endDate);

            return (
              <div
                key={index}
                className="absolute w-full bg-[#e9d2ee] hover:shadow-lg text-black px-8 py-6 rounded-lg drop-shadow-xl flex flex-col place-content-between transition-all duration-300 ease-in-out border-l-8 border-[#baa8be]"
                style={{
                  top: `${eventStartPosition}px`,
                  height: `${eventEndPosition - eventStartPosition}px`,
                }}
              >
                <p className="text-2xl">{event.title}</p>
                <div className="flex place-content-between w-full">
                  <span className="text-lg flex flex-col">
                    {new Date(event.startDate).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <p>Empieza</p>
                  </span>
                  <p className="flex items-center py-2 px-4 text-xl bg-black rounded text-white">
                    {formatDuration(event.startDate, event.endDate)}
                  </p>
                  <span className="text-lg ml-2">
                    {new Date(event.endDate).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <p>Termina</p>
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
  setDate,
}: {
  events: TaskType[];
  date: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) {
  const handlePreviousDay = () => {
    if (date) {
      setDate(subDays(date, 1));
    }
  };

  const handleNextDay = () => {
    if (date) {
      setDate(addDays(date, 1));
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col gap-2 place-content-between">
      <div className="flex justify-between items-center py-2">
        <button
          onClick={handlePreviousDay}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
        >
          <ArrowLeft className="mr-2" /> Día anterior
        </button>
        <span className="font-semibold text-lg">
          {(date ?? new Date()).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </span>
        <button
          onClick={handleNextDay}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
        >
          Siguiente día <ArrowRight className="ml-2" />
        </button>
      </div>

      <DayCalendarItem date={date} events={events} />
    </div>
  );
}
