import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";

import { ChevronLeft, ChevronRight } from "lucide-react";

import SelectDate from "@/components/Elements/General/SelectDate";
import { useLocale } from "next-intl";

interface CalendarNavProps {
  handlePreviousMonth: () => void;
  date: Date | undefined;
  handleYearChange: (year: string) => void;
  handleNextMonth: () => void;
}

export default function CalendarNav({
  handlePreviousMonth,
  date,
  handleYearChange,
  handleNextMonth,
}: CalendarNavProps) {
  const locale = useLocale();

  return (
    <div className="flex flex-col justify-center items-center divide-y divide-primary-200">
      <p className="text-xl text-primary-500 capitalize w-full text-center pb-4">
        {format(date ?? new Date(), "EEEE dd, MMMM", {
          locale: locale === "es" ? es : enUS,
        })}
      </p>
      <div className="flex w-full items-center place-content-between py-2 px-4">
        <SelectDate
          handleDateChange={(date) =>
            handleYearChange(
              date.getMonth().toString() + " " + date.getFullYear().toString()
            )
          }
          date={date}
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
