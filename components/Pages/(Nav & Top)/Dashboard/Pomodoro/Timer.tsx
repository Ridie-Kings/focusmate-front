"use client";

import { Eye } from "lucide-react";

import { useState, useContext, useEffect, useCallback } from "react";

import { TimerContext } from "@/components/Provider/TimerProvider";
import Time from "./Timer/Time";
import { SocketIOContext } from "@/components/Provider/WebsocketProvider";
import { timeUtils } from "@/components/Provider/TimerProvider/TimeUtils";
import CircleTime from "./Timer/CircleTime";

export default function Timer() {
  const {
    time,
    setTime,
    isPlay,
    togglePlay,
    resetTimer,
    initialTime,
    isChronometer,
    menu,
  } = useContext(TimerContext);

  const { status } = useContext(SocketIOContext);

  useEffect(() => {
    if (!status && !isChronometer) {
      resetTimer();
      return;
    }

    if (status) {
      if (!isChronometer)
        setTime(timeUtils.secondsToTime(status.remainingTime));

      if (status.isPaused && isPlay) {
        togglePlay();
      } else if (!status.isPaused && !isPlay) {
        togglePlay();
      }
    }
  }, [status, resetTimer, setTime, togglePlay, isPlay, isChronometer]);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <CircleTime
        percent={
          (timeUtils.timeToSeconds(time) * 100) /
          timeUtils.timeToSeconds(initialTime)
        }
      >
        <p className="capitalize bg-secondary-200 rounded-full px-1 text-sm hover:scale-105 cursor-default transition-all duration-300">
          {menu}
        </p>
        <Time time={time} />
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-secondary-700" />{" "}
            <div className="size-2 rounded-full bg-secondary-700" />{" "}
            <div className="size-2 rounded-full bg-secondary-700" />{" "}
            <div className="size-2 rounded-full bg-secondary-700" />
          </div>
          <p className="text-xs text-gray-300">4 Vueltas</p>
        </div>
      </CircleTime>
    </div>
  );
}
