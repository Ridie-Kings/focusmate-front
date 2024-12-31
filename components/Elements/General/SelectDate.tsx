import { useEffect } from "react";

export default function SelectDate({
  handleDateChange,
  date,
  dateType,
  dates,
}: {
  handleDateChange: (date: string) => void;
  date: Date;
  dateType: string;
  dates: number[];
}) {
  const getFullDate = (date: Date) => {
    switch (dateType) {
      case "day":
        return date.getDay().toString();
      case "year":
        return date.getFullYear().toString();
      case "month":
        return date.getMonth().toString();
      default:
        return date.getFullYear().toString();
    }
  };
  useEffect(() => {});

  return (
    <select
      onChange={(e) => handleDateChange(e.target.value)}
      value={getFullDate(date)}
      className="rounded pl-2 pr-1 appearance-none cursor-pointer"
    >
      {dates.map((date) => (
        <option key={date} value={date}>
          {date}
        </option>
      ))}
    </select>
  );
}
