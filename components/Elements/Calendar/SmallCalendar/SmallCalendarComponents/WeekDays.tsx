const WEEK_DAYS = ["L", "M", "X", "J", "V", "S", "D"];

export default function WeekDays() {
  return (
    <div className="grid grid-cols-7">
      {WEEK_DAYS.map((day, index) => (
        <div key={index} className="text-sm text-accent text-center">
          {day}
        </div>
      ))}
    </div>
  );
}
