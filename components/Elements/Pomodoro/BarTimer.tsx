import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import DotTimer from "./BarTimer/DotTimer";

export default function BarTimer({
  time,
  initialTime,
  isChronometer,
}: {
  time: TimeType;
  initialTime: TimeType;
  isChronometer: boolean;
}) {
  const timeToSeconds = (t: TimeType): number =>
    t.hours * 3600 + t.min * 60 + t.seg;

  const initialTimeInSeconds = timeToSeconds(initialTime);
  const currentTimeInSeconds = timeToSeconds(time);

  const percentageRemaining =
    initialTimeInSeconds > 0
      ? (currentTimeInSeconds * 100) / initialTimeInSeconds
      : 0;

  const divider = initialTimeInSeconds / 4;

  return (
    <div
      style={{ opacity: isChronometer ? 0 : 1 }}
      className="w-3/4 flex place-content-between items-center rounded-full relative mx-auto overflow-x-hidden transition-all duration-300"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <DotTimer
          key={index}
          color={
            currentTimeInSeconds <= initialTimeInSeconds - divider * index
              ? "#248277"
              : "#a1cdb3"
          }
        />
      ))}
      <div className="h-0.5 w-full absolute bg-primary-500" />
      <div
        style={{
          width: `${percentageRemaining}%`,
        }}
        className="h-0.5 absolute bg-primary-200 right-0 transition-all duration-200"
      />
    </div>
  );
}
