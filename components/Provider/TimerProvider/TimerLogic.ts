"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { timeUtils } from "./TimeUtils";
import TimerUtils from "@/lib/TimerUtils";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";
import { differenceInSeconds } from "date-fns";

export function useTimer({
  status,
  setStatus,
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
  status: PomodoroStatusType | null;
  setStatus: Dispatch<SetStateAction<PomodoroStatusType | null>>;
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
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/ding-ding.mp3");
    }
  }, [isPlay]);

  useEffect(() => {
    if (!status || isChronometer) return;

    if (
      status.state === "working" ||
      status.state === "shortBreak" ||
      status.state === "longBreak"
    ) {
      setTime((prev) => {
        try {
          const startDate = new Date(status.startAt);
          const endDate = new Date(status.endAt);

          const timeInSeconds =
            status.remainingTime !== null
              ? status.remainingTime
              : status.pausedState === "paused"
              ? differenceInSeconds(endDate, startDate)
              : differenceInSeconds(endDate, new Date());

          return {
            ...prev,
            initialTime: timeUtils.secondsToTime(status.workDuration),
            currentTime: timeUtils.secondsToTime(timeInSeconds),
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
      setMenu("enfoque");
      setIsPlay(false);
      setTime((prev) => ({
        ...prev,
        initialTime: timeUtils.secondsToTime(status.workDuration),
        currentTime: timeUtils.secondsToTime(status.workDuration),
      }));
      setStartedElement(false);
    }

    if (
      status.state !== "idle" &&
      status.state !== "finished" &&
      status.state !== "completed"
    )
      setStartedElement(true);
  }, [
    status,
    isPlay,
    setIsPlay,
    setMenu,
    setStartedElement,
    setTime,
    setStatus,
    isChronometer,
  ]);

  useEffect(() => {
    if (status) {
      setTotalCycles(status.cycles ?? 4);
      setCycles(status.currentCycle ?? 0);
      hasCyclesBeenSetRef.current = status.currentCycle !== undefined;
    }
  }, [status, setCycles, setTotalCycles]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlay) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          const currentSeconds = timeUtils.timeToSeconds(prev.currentTime);

          if (currentSeconds <= 1) {
            playEndSound();
            clearInterval(intervalRef.current as NodeJS.Timeout);
            intervalRef.current = null;
            return prev;
          }

          return {
            ...prev,
            currentTime: timeUtils.secondsToTime(currentSeconds - 1),
          };
        });
      }, 1000);
    }

    if (status?.state === "completed" || status?.state === "finished") {
      resetTimer();
      setTime((prev) => ({
        ...prev,
        initialTime: timeUtils.secondsToTime(1500),
        currentTime: timeUtils.secondsToTime(1500),
      }));
      setCycles(0);
      setTotalCycles(4);
      setStatus(null);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    isPlay,
    menu,
    playEndSound,
    setMenu,
    cycles,
    totalCycles,
    resetTimer,
    setTime,
  ]);

  return {
    togglePlay,
    resetTimer,
    playEndSound,
  };
}
