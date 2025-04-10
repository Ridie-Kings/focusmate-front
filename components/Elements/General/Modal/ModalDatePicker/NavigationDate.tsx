"use client";
import { Dispatch, SetStateAction } from "react";
import SelectDate from "../../SelectDate";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavigationDate({
  date,
  // setDate,
}: {
  date: Date | undefined;
  // setDate: Dispatch<SetStateAction<Date | undefined>>;
}) {
  const handleYearChange = () => {};
  const handlePreviousMonth = () => {};
  const handleNextMonth = () => {};

  const years = Array.from(
    { length: 2 },
    (_, i) => new Date().getFullYear() + i
  );
  return (
    <div className="flex place-content-between px-4 py-1">
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
          <ChevronLeft className="size-6" />
        </button>
        <button
          onClick={handleNextMonth}
          aria-label="Mois suivant"
          className="p-2 rounded-sm cursor-pointer"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </div>
  );
}
