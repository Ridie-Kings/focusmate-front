import { EventType } from "@/services/interfaces/Calendar/EventType";
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
import { useState } from "react";
import Divider from "../../General/Divider";

const WeekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  const getNowPosition = () => {
    date = new Date("Decembre 28, 2024 00:00:00");
    const hours = getHours(date);
    const minutes = getMinutes(date);
    const totalSlots = hours * 2 + Math.floor(minutes / 30);
    const slotHeight = 100 / 48;
    return totalSlots * slotHeight;
  };

  return (
    <div className="grid grid-cols-8 w-full h-full rounded-xl overflow-hidden relative gap-2">
      <div className="flex flex-col gap-5 relative">
        <div
          className={`text-sm flex flex-col text-white-100 py-2 border-2 border-white-default`}
        >
          Don &apos;t look
          <Divider backgroundColor="white" />
          at the code
        </div>
        <div className="h-full flex flex-col gap-5 text-sm text-gray-600 relative">
          <div
            className="absolute left-0 right-0 h-0.5 bg-red-500"
            style={{ top: `${getNowPosition()}%` }}
          />
          {Array.from({ length: 48 }, (_, i) => {
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
      {days.map((day, index) => (
        <div key={index} className="flex flex-col gap-5">
          <div
            className={`relative text-sm font-medium flex flex-col items-center uppercase text-gray-500 group text-center py-2 border-2 rounded-lg`}
          >
            {WeekDay[getDay(day)]}
            <Divider width="90%" />
            {day.getDate()}
          </div>
          <div
            className={`text-center pt-1 h-full cursor-pointer border rounded-lg hover:bg-gray-100 transition-all duration-200 relative`}
          >
            <div className="absolute top-6 left-1 right-1 text-xs text-gray-600">
              {events
                .filter((event) => isSameDay(new Date(event.date), day))
                .map((event, i) => (
                  <div key={i} className="bg-blue-100 p-1 rounded mb-1">
                    {event.title}
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function WeekCalendar({ events }: { events: EventType[] }) {
  const [date, setDate] = useState<Date>(new Date());

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
