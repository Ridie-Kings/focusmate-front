import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";

export default function Time({
  time,
  size,
  stacked,
}: {
  time: TimeType;
  size?: string;
  stacked?: boolean;
}) {
  if (stacked) {
    const minStr = String(time.min).padStart(2, "0");
    const secStr = String(time.seg).padStart(2, "0");
    const hourStr = String(time.hours).padStart(2, "0");

    const defaultClassName =
      "bg-secondary-200 p-1 px-2 rounded-lg text-primary-500 font-semibold";

    return (
      <div className={`flex items-center ${size ?? "text-8xl"} gap-2 relative`}>
        {time.hours > 0 && (
          <p className="relative group flex gap-2">
            <span className={defaultClassName}>{hourStr[0]}</span>
            <span className={defaultClassName}>{hourStr[1]}</span>
            <span>:</span>
          </p>
        )}
        <p className="relative group flex gap-2">
          <span className={defaultClassName}>{minStr[0]}</span>
          <span className={defaultClassName}>{minStr[1]}</span>
        </p>
        <span className="text-secondary-200">:</span>
        <p className={`relative group flex gap-2 ${size ?? "text-8xl"}`}>
          <span className={defaultClassName}>{secStr[0]}</span>
          <span className={defaultClassName}>{secStr[1]}</span>
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-4 ${size ?? "text-6xl"} text-secondary-700 relative`}
    >
      <p className="relative group">
        {time.hours > 0 && (
          <>
            <span>{String(time.hours).padStart(2, "0")}:</span>
          </>
        )}
        <span>{String(time.min).padStart(2, "0")}</span>:
        <span>{String(time.seg).padStart(2, "0")}</span>
      </p>
    </div>
  );
}
