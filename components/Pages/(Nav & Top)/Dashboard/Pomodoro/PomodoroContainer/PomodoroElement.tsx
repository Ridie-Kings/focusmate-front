"use client";
import CircleTime from "./PomodoroElement/CircleTime";
import { timeUtils } from "@/components/Provider/TimerProvider/TimeUtils";

import { useIsChronometer, useMenu, useTime } from "@/stores/timerStore";
import Time from "./PomodoroElement/Time";
import CyclesDots from "./PomodoroElement/CyclesDots";
import MenuTitle from "./PomodoroElement/MenuTitle";

export default function PomodoroElement({
  size,
}: {
  size: "small" | "medium" | "large";
}) {
  const isChronometer = useIsChronometer();
  const time = useTime();
  const menu = useMenu();

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        !isChronometer
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
      } absolute w-full flex justify-center`}
    >
      <CircleTime
        percent={
          (timeUtils.timeToSeconds(time.currentTime) * 100) /
          timeUtils.timeToSeconds(time.initialTime)
        }
        size={size}
      >
        <MenuTitle size={size} menu={menu} />
        <Time
          time={time.currentTime}
          size={
            time.currentTime.hours >= 1
              ? size === "large"
                ? "text-5xl md:text-6xl lg:text-7xl 2xl:text-9xl"
                : "text-6xl"
              : size === "large"
              ? "text-5xl md:text-6xl lg:text-7xl 2xl:text-9xl"
              : "text-6xl"
          }
          stacked={size === "large"}
        />
        <CyclesDots size={size} />
      </CircleTime>
    </div>
  );
}
