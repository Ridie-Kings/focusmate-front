type DateType = "day" | "year" | "month";

interface SelectDateProps {
  handleDateChange: (date: string) => void;
  date: Date | undefined;
  dateType: DateType;
  dates: number[];
}

export default function SelectDate({
  handleDateChange,
  date,
  dateType,
  dates,
}: SelectDateProps) {
  const getFullDate = (date: Date | undefined): string => {
    if (!date) return dates[0].toString();

    switch (dateType) {
      case "day":
        return date.getDate().toString();
      case "year":
        return date.getFullYear().toString();
      case "month":
        return (date.getMonth() + 1).toString();
      default:
        return date.getFullYear().toString();
    }
  };

  return (
    <select
      onChange={(e) => handleDateChange(e.target.value)}
      value={getFullDate(date)}
      className="rounded-sm pl-2 pr-1 text-accent appearance-none cursor-pointer"
    >
      {dates.map((dateValue) => (
        <option key={dateValue} value={dateValue}>
          {dateValue}
        </option>
      ))}
    </select>
  );
}
