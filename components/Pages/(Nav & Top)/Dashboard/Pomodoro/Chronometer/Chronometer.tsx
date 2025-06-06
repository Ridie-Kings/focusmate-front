"use client";
import Time from "../PomodoroContainer/PomodoroElement/Time";
import { useIsChronometer, useTime } from "@/stores/timerStore";

export default function Chronometer() {
  const isChronometer = useIsChronometer();
  const time = useTime();

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isChronometer
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      } absolute w-full flex justify-center items-center`}
    >
      <Time time={time.currentTime} size="text-8xl" />
    </div>
  );
}
