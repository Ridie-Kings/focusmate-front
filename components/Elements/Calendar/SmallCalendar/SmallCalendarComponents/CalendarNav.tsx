import { format } from "date-fns";
import { es } from "date-fns/locale";

import { ChevronLeft, ChevronRight } from "lucide-react";

import SelectDate from "@/components/Elements/General/SelectDate";

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
    <div className="flex flex-col justify-center items-center">
      <p className="text-xl text-primary-500">
        {format(date ?? new Date(), "EEEE dd, MMMM", { locale: es })}
      </p>
      <div className="flex w-full items-center place-content-between py-2 px-4">
        <SelectDate
          handleDateChange={handleYearChange}
          dateType="year"
          date={date}
          dates={years}
        />
        <div className="flex">
          <button
            onClick={handlePreviousMonth}
            aria-label="Mes précédent"
            className="p-2 rounded-sm cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={handleNextMonth}
            aria-label="Mois suivant"
            className="p-2 rounded-sm cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
