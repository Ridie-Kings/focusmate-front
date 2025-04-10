import TimeBar from "@/components/Elements/Calendar/TimeBar";
import TimeLeftBar from "@/components/Elements/Calendar/TimeLeftBar";
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

const getPosition = (date: Date) => {
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
      <TimeLeftBar length={97} divider={4} calc={2} />
      <TimeBar pos={getPosition(new Date())} />
      <div className="relative w-full h-full">
        {events
          .filter((event) => date && isSameDay(event.date.start, date))
          .map((event, index) => {
            const eventStartPosition = getPosition(event.date.start);
            const eventEndPosition = getPosition(event.date.end);
            const totalMinutes = Math.abs(
              differenceInMinutes(event.date.end, event.date.start)
            );

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
                    {event.date.start.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <p>Empieza</p>
                  </span>
                  <p className="flex items-center py-2 px-4 text-xl bg-black rounded text-white-100">
                    {Math.floor(totalMinutes / 60)}:{totalMinutes % 60} min{" "}
                  </p>
                  <span className="text-lg ml-2">
                    {event.date.end.toLocaleTimeString("es-ES", {
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
