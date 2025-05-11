import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";

export default function Time({ time, size }: { time: TimeType; size?: string }) {
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
