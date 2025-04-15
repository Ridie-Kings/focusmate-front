import { ChevronLeft, ChevronRight } from "lucide-react";
import SelectDate from "../SelectDate";
import { es } from "date-fns/locale";
import { format } from "date-fns";

interface CalendarNavProps {
  handlePreviousMonth: () => void;
  date: Date | undefined;
  years: number[];
  handleYearChange: (year: string) => void;
  handleNextMonth: () => void;
}

export default function CalendarNav({
  handlePreviousMonth,
  date,
  years,
  handleYearChange,
  handleNextMonth,
}: CalendarNavProps) {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={handlePreviousMonth}
        aria-label="Mes précédent"
        className="p-1 rounded-sm hover:bg-gray-100 cursor-pointer"
      >
        <ChevronLeft className="size-5" />
      </button>
      <div className="text-center">
        <p className="text-lg capitalize">
          {format(date ?? new Date(), "EEEE dd, MMMM", { locale: es })}
        </p>
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
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
