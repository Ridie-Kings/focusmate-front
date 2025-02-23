"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";
import SelectDate from "./SelectDate";
import { Dispatch, SetStateAction } from "react";

const WEEK_DAYS = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

const generateMonthDays = (date: Date) => {
  const startDate = startOfWeek(startOfMonth(date), { locale: es });
  const endDate = endOfWeek(endOfMonth(date), { locale: es });

  const days: Date[] = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return days;
};

const CalendarItem = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) => {
  const days = generateMonthDays(date);

  const isToday = (day: Date) => isSameDay(day, new Date());

  return (
    <div className="grid grid-cols-7 gap-1">
      {WEEK_DAYS.map((day, index) => (
        <div
          key={index}
          className="text-sm font-medium text-gray-500 text-center"
        >
          {day}
        </div>
      ))}
      {days.map((day, index) => (
        <div
          key={index}
          className={`text-center p-2 rounded cursor-pointer ${
            day.getMonth() === date.getMonth() ? "text-black" : "text-gray-400"
          } ${
            isToday(day)
              ? "bg-black-100 text-white-100"
              : "hover:bg-black-100/80 hover:text-white-100"
          } ${isSameDay(day, date) && "bg-black-100/80 text-white-100"}`}
          onClick={() => setDate(day)}
        >
          {day.getDate()}
        </div>
      ))}
    </div>
  );
};

export default function Calendar({
  className = "",
  inView,
  setDate,
  date,
  btn,
}: {
  className?: string;
  inView?: boolean;
  setDate: Dispatch<SetStateAction<Date>>;
  date: Date;
  btn?: boolean;
}) {
  const handlePreviousMonth = () => setDate(subMonths(date, 1));
  const handleNextMonth = () => setDate(addMonths(date, 1));
  const handleYearChange = (year: string) =>
    setDate((currentDate: Date) => {
      const newDate = new Date(currentDate);
      newDate.setFullYear(parseInt(year));
      return newDate;
    });

  const years = Array.from(
    { length: 2 },
    (_, i) => new Date().getFullYear() + i
  );

  return (
    <motion.div
      className={`flex flex-col gap-2 py-2 overflow-hidden ${className}`}
      initial={{ height: "100%", width: "100%" }}
      animate={{
        display: inView ? "flex" : ["flex", "none"],
        height: inView ? "100%" : ["100%", "0"],
        opacity: inView ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousMonth}
          aria-label="Mois précédent"
          className="p-1 rounded-sm hover:bg-gray-100 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="text-center text-lg font-semibold">
          <p>{format(date, "MMMM", { locale: es })}</p>
          <SelectDate
            handleDateChange={handleYearChange}
            dateType="year"
            date={date}
            dates={years}
          />
        </div>
        <button
          onClick={handleNextMonth}
          aria-label="Mois suivant"
          className="p-1 rounded-sm hover:bg-gray-100 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <CalendarItem date={date} setDate={setDate} />
      {btn && (
        <button className="bg-black-100 w-full py-2 rounded-full text-white-100">
          Nuevo Evento
        </button>
      )}
    </motion.div>
  );
}
