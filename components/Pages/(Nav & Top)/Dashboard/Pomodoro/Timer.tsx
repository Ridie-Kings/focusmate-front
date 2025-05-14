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
    <div className="flex flex-col items-center gap-2 w-full">
      {isChronometer ? (
        <Time time={time.currentTime} size="text-8xl" />
      ) : (
        <CircleTime
          percent={
            (timeUtils.timeToSeconds(time.currentTime) * 100) /
            timeUtils.timeToSeconds(time.initialTime)
          }
        >
          <p className="capitalize bg-secondary-200 rounded-full px-1 text-sm hover:scale-105 cursor-default transition-all duration-300">
            {menu}
          </p>
          <Time time={time.currentTime} />
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              {totalCycles && cycles
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
      )}
    </div>
  );
}
