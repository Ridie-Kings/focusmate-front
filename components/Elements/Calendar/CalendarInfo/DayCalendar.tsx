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
import { SetStateAction } from "react";
import SelectDate from "../../General/SelectDate";
import { Dispatch } from "react";
const getNowPosition = (date: Date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);
  const totalMinutesInDay = hours * 60 + minutes;
  const totalMinutesInWeekday = 24 * 60;
  return (totalMinutesInDay / totalMinutesInWeekday) * 99.9;
};

const DayCalendarItem = ({
  date,
  events,
}: {
  date: Date;
  events: EventType[];
}) => {
  return (
    <div className="flex w-full h-full rounded-xl relative gap-2">
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
            top: `${getNowPosition(date)}%`,
          }}
        />
      </div>
      <div className="relative w-full h-full">
          <div
            className="absolute left-0 right-0 h-0.5 bg-red-500"
            style={{
              top: `${getNowPosition(date)}%`,
            }}
          />

        {events
          .filter((event) => isSameDay(new Date(event.date.start), date))
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
                  top: `${eventStartPosition}%`,
                  height: `${eventEndPosition - eventStartPosition}%`,
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
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) {
  const handlePreviousDay = () => {
    setDate(subDays(date, 1));
  };

  const handleNextDay = () => {
    setDate(addDays(date, 1));
  };

  const handleDayChange = (day: string) =>
    setDate((currentDate) => {
      const newDate = new Date(currentDate);
      newDate.setDate(Number(day));
      return newDate;
    });

  const days = Array.from({ length: 5 }, (_, i) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + i);
    return currentDate.getDate();
  }).filter((_, i, arr) => i < 5 && arr[i] >= arr[0]);

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
          <SelectDate
            handleDateChange={handleDayChange}
            dateType="day"
            dates={days}
            date={date}
          />
          {date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
          })}
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
