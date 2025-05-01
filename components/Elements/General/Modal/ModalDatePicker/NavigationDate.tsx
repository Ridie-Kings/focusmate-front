"use client";
// import { Dispatch } from "react";
import SelectDate from "../../SelectDate";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavigationDate({
  date,
}: // setDate,
{
  date: Date | undefined;
  // setDate: Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  const handlePreviousMonth = () => {};
  const handleNextMonth = () => {};

  const handleMonthYearChange = () => {
    // setDate((currentDate) => {
    //   const [month, year] = monthYear.split(" ");
    //   const monthNames = Array.from({ length: 12 }, (_, i) =>
    //     format(new Date(2000, i, 1), "MMMM", { locale: es })
    //   );
    //   const monthIndex = monthNames.findIndex((m) => m === month);
    //   const newDate = new Date(currentDate ?? new Date());
    //   newDate.setMonth(monthIndex);
    //   newDate.setFullYear(parseInt(year));
    //   return newDate;
    // });
  };

  return (
    <div className="flex place-content-between px-4 py-1">
      <SelectDate handleDateChange={handleMonthYearChange} date={date} />
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
