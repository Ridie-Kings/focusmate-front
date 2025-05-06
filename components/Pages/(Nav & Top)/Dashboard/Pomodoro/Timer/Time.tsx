import HiddenTimerPlant from "@/components/Elements/Svg/HiddenTimerPlant";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { Pen } from "lucide-react";

export default function Time({
  hiddenTime,
  time,
  isEditeble,
}: {
  hiddenTime: boolean;
  time: TimeType;
  isEditeble: boolean;
}) {
  return (
    <div className="flex gap-4 text-7xl md:text-8xl text-primary-500 font-light relative">
      {!hiddenTime ? (
        <p className="relative group">
          {time.hours > 0 && (
            <>
              <span>{String(time.hours).padStart(2, "0")}:</span>
            </>
          )}
          <span>{String(time.min).padStart(2, "0")}</span>:
          <span>{String(time.seg).padStart(2, "0")}</span>
          {isEditeble && (
            <button className="absolute top-0 right-0 group-hover:opacity-100 opacity-0 bg-primary-500 rounded-full p-1.5 transition-all duration-300 cursor-pointer">
              <Pen className="text-secondary-200" size={20} />
            </button>
          )}
        </p>
      ) : (
        <HiddenTimerPlant />
      )}
    </div>
  );
}
