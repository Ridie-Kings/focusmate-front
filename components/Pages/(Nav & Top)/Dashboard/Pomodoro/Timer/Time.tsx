import HiddenTimerPlant from "@/components/Elements/Svg/HiddenTimerPlant";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";

export default function Time({
  hiddenTime,
  time,
}: {
  hiddenTime: boolean;
  time: TimeType;
}) {
  return (
    <div className="flex gap-4 text-7xl md:text-8xl text-primary-500 font-light relative">
      {!hiddenTime ? (
        <p>
          {time.hours > 0 && (
            <>
              <span>{String(time.hours).padStart(2, "0")}:</span>
            </>
          )}
          <span>{String(time.min).padStart(2, "0")}</span>:
          <span>{String(time.seg).padStart(2, "0")}</span>
        </p>
      ) : (
        <HiddenTimerPlant />
      )}
    </div>
  );
}
