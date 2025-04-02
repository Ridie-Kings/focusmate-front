import { EventType } from "@/interfaces/Calendar/EventType";
import {
  addDays,
  subDays,
  getHours,
  getMinutes,
  differenceInMinutes,
  isSameDay,
} from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SetStateAction, Dispatch } from "react";

const getNowPosition = (date: Date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);

  return 14 + hours * 4 * 48 + minutes * (48 / 15);
};

const DayCalendarItem = ({
  date,
  events,
}: {
  date: Date | undefined;
  events: EventType[];
}) => {
  return (
    <div className="flex w-full rounded-xl relative gap-2 overflow-auto 2xl:h-[calc(100vh-360px)] xl:h-[calc(100vh-200px)]">
      <div className="flex flex-col gap-5 relative">
        <div className="h-full flex flex-col gap-5 text-sm text-gray-600 relative">
          {Array.from({ length: 97 }, (_, i) => {
            const hours = Math.floor(i / 4);
            const minutes = (i % 4) * 15;

            return (
              <div key={i} className="relative flex items-center">
                <div className="flex-1 px-7 text-center text-lg cursor-pointer">
                  {`${hours.toString().padStart(2, "0")}:${
                    minutes === 0 ? "00" : minutes
                  }`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-full  w-full absolute top-0 left-0 z-10 pointer-events-none">
        <div
          className="absolute left-0 right-0 h-0.5 bg-gray-100"
          style={{
            top: `${date ? getNowPosition(date) : 0}px`,
          }}
        />
      </div>
      <div className="relative w-full h-full">
        <div
          className="absolute left-0 right-0 h-0.5 bg-red-500"
          style={{
            top: `${getNowPosition(date ?? new Date())}px`,
          }}
        />

        {events
          .filter(
            (event) => date && isSameDay(new Date(event.date.start), date)
          )
          .map((event, index) => {
            const eventStartPosition = getNowPosition(event.date.start);
            const eventEndPosition = getNowPosition(event.date.end);
            const totalMinutes = Math.abs(
              differenceInMinutes(event.date.end, event.date.start)
            );
            return (
              <div
                key={index}
                className="absolute w-full bg-gray-100/25 hover:shadow-lg text-white p-5 rounded-lg shadow-md flex flex-col place-content-between transition-all duration-300 ease-in-out"
                style={{
                  top: `${eventStartPosition}px`,
                  height: `${eventEndPosition - eventStartPosition}px`,
                }}
              >
                <p className="text-3xl text-gray-100">{event.title}</p>
                <div className="flex place-content-between w-full">
                  <span className="text-lg flex flex-col">
                    {event.date.start.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <p>Start</p>
                  </span>
                  <div className="flex items-center px-10 text-2xl bg-gray-100 rounded-lg text-white-100">
                    <p>
                      {Math.floor(totalMinutes / 60)}:{totalMinutes % 60} min{" "}
                    </p>
                  </div>
                  <span className="text-lg ml-2">
                    {event.date.end.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <p>Finish</p>
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
  events: EventType[];
  date: Date | undefined;
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

  // const handleDayChange = (day: string) =>
  //   setDate((currentDate) => {
  //     const newDate = new Date(currentDate);
  //     newDate.setDate(Number(day));
  //     return newDate;
  //   });

  // const days = Array.from({ length: 5 }, (_, i) => {
  //   const currentDate = new Date(date);
  //   currentDate.setDate(currentDate.getDate() + i);
  //   return currentDate.getDate();
  // }).filter((_, i, arr) => i < 5 && arr[i] >= arr[0]);

  return (
    <div className="w-full flex-1 flex flex-col gap-2 place-content-between">
      <div className="flex justify-between items-center py-2">
        <button
          onClick={handlePreviousDay}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <ArrowLeft className="mr-2" /> Last Day
        </button>
        <span className="font-semibold text-lg">
          {date
            ? date.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })
            : "Invalid Date"}
        </span>
        <button
          onClick={handleNextDay}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Next Day <ArrowRight className="ml-2" />
        </button>
      </div>

      <DayCalendarItem date={date} events={events} />
    </div>
  );
}
