"use client";

import { useContext } from "react";
import { TimerContext } from "@/components/Provider/TimerProvider";
import Time from "./Timer/Time";
import { timeUtils } from "@/components/Provider/TimerProvider/TimeUtils";
import CircleTime from "./Timer/CircleTime";

export default function Timer() {
  const { time, isChronometer, menu, cycles, totalCycles } =
    useContext(TimerContext);

  return (
    <div id="timer-component" className="flex flex-col justify-center items-center gap-2 w-full relative overflow-hidden min-h-[248px]">
      <div
        className={`transform transition-all duration-300 ease-in-out ${
          isChronometer
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        } absolute w-full flex justify-center items-center`}
      >
        <Time time={time.currentTime} size="text-8xl" />
      </div>

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
        >
          <p className="capitalize bg-secondary-200 rounded-full px-1 text-sm hover:scale-105 cursor-default transition-all duration-300">
            {menu}
          </p>
          <Time
            time={time.currentTime}
            size={time.currentTime.hours >= 1 ? "text-5xl" : "text-6xl"}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              {totalCycles
                ? Array.from({ length: totalCycles }, (_, index) => (
                    <span key={index}>
                      {totalCycles - cycles > index ? (
                        <div
                          key={index}
                          className="size-2 rounded-full bg-secondary-700"
                        />
                      ) : (
                        <div
                          key={index}
                          className="size-2 rounded-full bg-secondary-500"
                        />
                      )}
                    </span>
                  )).reverse()
                : ""}
            </div>
            <p className="text-xs text-gray-300">{totalCycles} Vueltas</p>
          </div>
        </CircleTime>
      </div>
    </div>
  );
}
