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
import { useState } from "react";

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

const CalendarItem = ({ date }: { date: Date }) => {
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
          }`}
        >
          {day.getDate()}
        </div>
      ))}
    </div>
  );
};

export default function Calendar({
  className = "",
  inView = true,
}: {
  className?: string;
  inView?: boolean;
}) {
  const [date, setDate] = useState<Date>(new Date());

  const handlePreviousMonth = () => setDate(subMonths(date, 1));
  const handleNextMonth = () => setDate(addMonths(date, 1));
  const handleYearChange = (year: string) =>
    setDate((currentDate) => {
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
          className="p-1 rounded hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="text-center text-lg font-semibold">
          <p>{format(date, "MMMM", { locale: es })}</p>
          <select
            onChange={(e) => handleYearChange(e.target.value)}
            value={date.getFullYear().toString()}
            className="rounded px-2 py-1 appearance-none cursor-pointer"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleNextMonth}
          aria-label="Mois suivant"
          className="p-1 rounded hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <CalendarItem date={date} />
      <button className="bg-black-100 w-full py-2 rounded-full text-white-100">
        Nuevo Evento
      </button>
    </motion.div>
  );
}
