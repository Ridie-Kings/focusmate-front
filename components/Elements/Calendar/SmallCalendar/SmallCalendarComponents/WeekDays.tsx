import { useLocale } from "next-intl";

const WEEK_DAYS_ES = ["L", "M", "X", "J", "V", "S", "D"];
const WEEK_DAYS_EN = ["M", "T", "W", "T", "F", "S", "S"];

export default function WeekDays() {
  const locale = useLocale();

  const weekDays = locale === "es" ? WEEK_DAYS_ES : WEEK_DAYS_EN;

  return (
    <div className="grid grid-cols-7">
      {weekDays.map((day, index) => (
        <div key={index} className="text-sm text-center w-10">
          {day}
        </div>
      ))}
    </div>
  );
}
