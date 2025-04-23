"use client";

import { Eye } from "lucide-react";

import { useState, useContext, useEffect, useCallback } from "react";

import { TimerContext } from "@/components/Provider/TimerProvider";
import Time from "./Timer/Time";
import Commands from "../../../../Elements/Pomodoro/Commands";
import BarTimer from "@/components/Elements/Pomodoro/BarTimer";
import { SocketIOContext } from "@/components/Provider/WebsocketProvider";
import { timeUtils } from "@/components/Provider/TimerProvider/TimeUtils";

export default function Timer() {
  const {
    time,
    setTime,
    isPlay,
    togglePlay,
    resetTimer,
    setIsOpen,
    initialTime,
    setInitialTime,
    isChronometer,
  } = useContext(TimerContext);

  const { status, startPomodoro, stopPomodoro, pausePomodoro, resumePomodoro } =
    useContext(SocketIOContext);

  const [hiddenTime, setHiddenTime] = useState(false);
  const [did, setDid] = useState(0);

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
  }, [status, resetTimer, setTime, togglePlay, isPlay]);

  const handleClick = useCallback(
    (action: string) => {
      switch (action) {
        case "openFullScreen":
          setIsOpen(true);
          break;

        case "togglePlay":
          if (!isChronometer) {
            if (!status?.active) {
              startPomodoro(timeUtils.timeToSeconds(time));
            } else if (!status.isPaused) {
              pausePomodoro();
            } else if (status.isPaused) {
              resumePomodoro();
            }
          }

          togglePlay();
          break;

        case "reset":
          if (status?.active && status?.pomodoroId && !isChronometer)
            stopPomodoro(status.pomodoroId);
          resetTimer();
          break;

        default:
          break;
      }
    },
    [
      isChronometer,
      status,
      time,
      startPomodoro,
      pausePomodoro,
      resumePomodoro,
      stopPomodoro,
      setIsOpen,
      togglePlay,
      resetTimer,
      timeUtils,
    ]
  );

  const toggleTimeVisibility = useCallback(() => {
    setHiddenTime((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <Eye
        size={40}
        className="cursor-pointer text-primary-500 hover:opacity-80 transition-opacity"
        onClick={toggleTimeVisibility}
        aria-label={hiddenTime ? "Show time" : "Hide time"}
      />

      <Time hiddenTime={hiddenTime} time={time} />

      <BarTimer time={time} initialTime={initialTime} />

      <Commands handleClick={handleClick} isPlay={isPlay} />
    </div>
  );
}
