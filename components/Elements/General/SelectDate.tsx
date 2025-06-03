import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

interface SelectDateProps {
  handleDateChange: (date: Date) => void;
  date: Date | undefined;
  yearRange?: number[];
}

export default function YearMonthSelector({
  handleDateChange,
  date,
  yearRange = [2020, 2030],
}: SelectDateProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(date || new Date());
  const locale = useLocale();
  const years = Array.from(
    { length: yearRange[1] - yearRange[0] + 1 },
    (_, i) => (yearRange[0] + i).toString()
  );

  const handleYearChange = (yearValue: string) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(parseInt(yearValue));
    setSelectedDate(newDate);
    handleDateChange(newDate);
  };

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  return (
    <div className="flex gap-4 items-center w-full">
      <div className="flex flex-col">
        <select
          onChange={(e) => handleYearChange(e.target.value)}
          value={selectedDate.getFullYear()}
          className="text-gray-700 cursor-pointer outline-none"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <p className="flex-1 text-center capitalize">
        {format(selectedDate, "MMMM", {
          locale: locale === "es" ? es : enUS,
        })}
      </p>
    </div>
  );
}
