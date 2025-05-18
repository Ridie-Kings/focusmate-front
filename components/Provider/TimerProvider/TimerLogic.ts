"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { timeUtils } from "./TimeUtils";
import TimerUtils from "@/lib/TimerUtils";
import { PomodoroStatus } from "@/interfaces/websocket/WebSocketProvider";
import { differenceInSeconds } from "date-fns";

export function useTimer({
  status,
  isPlay,
  setIsPlay,
  time,
  setTime,
  menu,
  setMenu,
  setStartedElement,
  setCycles,
  setTotalCycles,
  cycles,
  totalCycles,
  isChronometer,
}: {
  status: PomodoroStatus | null;
  isPlay: boolean;
  setIsPlay: Dispatch<SetStateAction<boolean>>;
  time: {
    currentTime: TimeType;
    initialTime: TimeType;
  };
  setTime: Dispatch<
    SetStateAction<{
      currentTime: TimeType;
      initialTime: TimeType;
    }>
  >;
  menu: chipsIconType;
  setMenu: (menu: chipsIconType) => void;
  setStartedElement: Dispatch<SetStateAction<boolean>>;
  setTotalCycles: Dispatch<SetStateAction<number>>;
  setCycles: Dispatch<SetStateAction<number>>;
  cycles: number;
  totalCycles: number;
  isChronometer: boolean;
}) {
  // const { addToast } = useContext(ToastContext);

  const totalSecondsRef = useRef(timeUtils.timeToSeconds(time.initialTime));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasCyclesBeenSetRef = useRef(false);

  const { resetTimer, togglePlay, playEndSound } = TimerUtils({
    audioRef,
    setIsPlay,
    setTime,
    totalSecondsRef,
    setMenu,
    status,
    setCycles,
    totalCycles,
    setStartedElement,
  });

  useEffect(() => {
    if (!status || isChronometer) return;

    if (
      status.state === "working" ||
      status.state === "shortBreak" ||
      status.state === "longBreak"
    ) {
      setTime((prev) => {
        try {
          if (!status.startAt || !status.endAt) {
            console.error("Missing startAt or endAt timestamps");
            return prev;
          }

          const startDate = new Date(status.startAt);
          const endDate = new Date(status.endAt);

          if (
            startDate.toString() === "Invalid Date" ||
            endDate.toString() === "Invalid Date"
          ) {
            console.error("Invalid date format for startAt or endAt");
            return prev;
          }

          const timeInSeconds =
            status.remainingTime !== null
              ? status.remainingTime
              : status.state !== "idle"
              ? differenceInSeconds(endDate, new Date())
              : differenceInSeconds(endDate, startDate);

          const positiveTimeInSeconds = Math.max(0, timeInSeconds);

          return {
            ...prev,
            initialTime: timeUtils.secondsToTime(status.workDuration),
            currentTime: timeUtils.secondsToTime(positiveTimeInSeconds),
          };
        } catch (error) {
          console.error("Error calculating timer value:", error);
          return prev;
        }
      });

      if (status.state === "working") setMenu("enfoque");
      if (status.state === "shortBreak") setMenu("D/Corto");
      if (status.state === "longBreak") setMenu("D/Largo");

      if (status?.pausedState === "paused") setIsPlay(false);
      else if (!isPlay && status.pausedState !== "paused") setIsPlay(true);
    } else if (status.state === "idle") {
      setTime((prev) => ({
        ...prev,
        initialTime: timeUtils.secondsToTime(status.workDuration),
        currentTime: timeUtils.secondsToTime(status.workDuration),
      }));
    }

    if (status.state !== "idle") setStartedElement(true);
  }, [status, isPlay]);

  useEffect(() => {
    setTotalCycles(status?.cycles ?? 4);
    setCycles(status?.currentCycle ?? 0);
    hasCyclesBeenSetRef.current = status?.currentCycle !== undefined;
  }, [status]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/ding-ding.mp3");
    }
  }, []);

  useEffect(() => {
    if (!isPlay) {
      totalSecondsRef.current = timeUtils.timeToSeconds(time.currentTime);
    }
  }, [time, isPlay]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlay) {
      intervalRef.current = setInterval(() => {
        if (timeUtils.timeToSeconds(time.currentTime) > 0) {
          setTime((prev) => ({
            ...prev,
            currentTime: timeUtils.secondsToTime(
              timeUtils.timeToSeconds(prev.currentTime) - 1
            ),
          }));
        }
      }, 1000);
    }

    // if (hasCyclesBeenSetRef.current && cycles === totalCycles) {
    //   resetTimer();
    //   return;
    // }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlay, menu, playEndSound, setMenu, cycles]);

  return {
    togglePlay,
    resetTimer,
    playEndSound,
  };
}
