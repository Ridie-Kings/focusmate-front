import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";

export default function Time({ time }: { time: TimeType }) {
  return (
    <div className="flex gap-4 text-7xl md:text-6xl text-secondary-700 relative">
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
