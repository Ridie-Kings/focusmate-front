import { useState, useEffect } from "react";

interface SelectDateProps {
  handleDateChange: (date: Date) => void;
  date: Date | undefined;
  yearRange?: number[];
}

export default function YearMonthSelector({
  handleDateChange,
  date = new Date(),
  yearRange = [2020, 2030],
}: SelectDateProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(date || new Date());

  const years = Array.from(
    { length: yearRange[1] - yearRange[0] + 1 },
    (_, i) => (yearRange[0] + i).toString()
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleYearChange = (yearValue: string) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(parseInt(yearValue));
    setSelectedDate(newDate);
    handleDateChange(newDate);
  };

  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(selectedDate);

    newDate.setMonth(monthIndex);
    setSelectedDate(newDate);
    handleDateChange(newDate);
  };

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  return (
    <div className="flex gap-4 items-center">
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
      <div className="flex flex-col">
        <select
          onChange={(e) => handleMonthChange(parseInt(e.target.value))}
          value={selectedDate.getMonth()}
          className="text-gray-700 cursor-pointer outline-none"
        >
          {months.map((monthName, index) => (
            <option key={monthName} value={index}>
              {monthName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
