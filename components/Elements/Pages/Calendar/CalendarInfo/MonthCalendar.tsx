import { EventType } from "@/interfaces/Calendar/EventType";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import Dot from "@/components/Elements/General/Dot";

const CalendarItem = ({
  date,
  events,
}: {
  date: Date | undefined;
  events: EventType[];
}) => {
  const startDate = startOfWeek(startOfMonth(date ?? new Date()), {
    locale: es,
  });
  const endDate = endOfWeek(endOfMonth(date ?? new Date()), { locale: es });

  const days = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  const isToday = (day: Date) => isSameDay(day, new Date());

  return (
    <div className="grid grid-cols-7 w-full h-full border rounded-xl overflow-hidden">
      {days.map((day, index) => (
        <div
          key={index}
          className={`text-center pt-1 h-full cursor-pointer border text-xl relative ${
            day.getMonth() === (date?.getMonth() ?? new Date().getMonth()) ? "text-black" : "text-gray-400"
          } ${
            isToday(day)
              ? "bg-primary-green text-white-100"
              : "hover:bg-secondary-green hover:text-white-100"
          }`}
        >
          {day.getDate()}
          <div className="absolute top-6 left-1 right-1 text-xs text-gray-600">
            {events
              .filter((event) => isSameDay(new Date(event.date.start), day))
              .map((event, i) => (
                <div
                  key={i}
                  className={`p-1 rounded flex items-center gap-2 ${
                    isToday(day) ? "text-white-100" : "text-gray-100"
                  }`}
                >
                  <Dot size={10} />
                  {event.title}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function MonthCalendar({
  events,
  date,
  setDate,
}: {
  events: EventType[];
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) {
  const handlePreviousMonth = () => {
    setDate(subMonths(date ?? new Date(), 1));
  };

  const handleNextMonth = () => {
    setDate(addMonths(date ?? new Date(), 1));
  };

  return (
    <div className="w-full flex-1 flex flex-col gap-4 place-content-between">
      <div className="flex justify-between items-center py-2">
        <button
          onClick={handlePreviousMonth}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <ArrowLeft className="mr-2" /> Last Month
        </button>
        <span className="font-semibold text-lg">
          {(date ?? new Date()).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
          })}
        </span>
        <button
          onClick={handleNextMonth}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Next Month <ArrowRight className="ml-2" />
        </button>
      </div>

      <ul className="grid grid-cols-7 gap-1">
        {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((day, index) => (
          <div
            key={index}
            className={`relative text-accent text-xl text-center py-2 border-2 rounded-lg`}
          >
            {day}
          </div>
        ))}
      </ul>
      <CalendarItem date={date} events={events} />
    </div>
  );
}
