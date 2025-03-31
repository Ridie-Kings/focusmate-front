import { EventType } from "@/interfaces/Calendar/EventType";
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
} from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import Divider from "@/components/Elements/General/Divider";

const WeekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getNowPosition = (date: Date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);
  const totalMinutesInDay = hours * 60 + minutes;
  const totalMinutesInWeekday = 24 * 60;
  return (totalMinutesInDay / totalMinutesInWeekday) * 99.9;
};

const WeekCalendarItem = ({
  date,
  events,
}: {
  date: Date;
  events: EventType[];
}) => {
  const startDate = startOfDay(startOfWeek(date, { weekStartsOn: 1 }));
  const endDate = endOfDay(endOfWeek(date, { weekStartsOn: 1 }));

  const days = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return (
    <div className="grid grid-cols-8 w-full h-full rounded-xl relative gap-2 overflow-auto 2xl:h-[calc(100vh-360px)] xl:h-[calc(100vh-200px)]">
      <div className="flex flex-col gap-5 relative">
        <div
          className={`text-sm flex flex-col text-transparent py-2 border-2 border-transparent pointer-events-none`}
        >
          Don &apos;t look
          <Divider backgroundColor="white" />
          at the code
        </div>
        <div className="h-full flex flex-col gap-5 text-sm text-gray-600 relative">
          {Array.from({ length: 49 }, (_, i) => {
            const hours = Math.floor(i / 2);
            const minutes = i % 2 === 0 ? "00" : "30";

            return (
              <div key={i} className="relative flex items-center">
                <div className="flex-1 px-7 text-center text-lg cursor-pointer">
                  {`${hours.toString().padStart(2, "0")}:${minutes}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-[96.2%] w-full absolute top-24 left-0 z-10 pointer-events-none">
        <div
          className="absolute left-0 right-0 h-0.5 bg-gray-100"
          style={{
            top: `${getNowPosition(date)}%`,
          }}
        />
      </div>

      {days.map((day, index) => (
        <div key={index} className="flex flex-col gap-5">
          <div
            className={`text-xl flex flex-col items-center text-center py-2 border border-primary-green rounded-lg sticky top-0 z-10 ${
              isSameDay(new Date(), day)
                ? "bg-primary-green text-white-100"
                : "bg-white text-primary-green"
            }`}
          >
            {WeekDay[getDay(day)]}
            <Divider width="90%" />
            {day.getDate()}
          </div>
          <div
            className={`text-center p-1 h-full cursor-pointer hover:bg-gray-100/25 rounded-lg transition-all duration-200 relative`}
          >
            {events
              .filter((event) => isSameDay(new Date(event.date.start), day))
              .map((event, i) => {
                const eventStartPosition = getNowPosition(event.date.start);
                const eventEndPosition = getNowPosition(event.date.end);
                return (
                  <div
                    key={i}
                    className="absolute w-[95%] bg-blue-100 p-1 rounded-sm mb-1 flex flex-col place-content-between"
                    style={{
                      top: `${eventStartPosition}%`,
                      height: `${eventEndPosition - eventStartPosition}%`,
                    }}
                  >
                    <p>{event.title}</p>
                    <div className="flex place-content-between w-full text-gray-100 text-sm p-1">
                      <span>
                        {event.date.start.toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span>
                        {event.date.end.toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function WeekCalendar({
  events,
  date,
  setDate,
}: {
  events: EventType[];
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
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
          <ArrowLeft className="mr-2" /> Last Week
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
          Next Week <ArrowRight className="ml-2" />
        </button>
      </div>

      <WeekCalendarItem date={date} events={events} />
    </div>
  );
}
